import React, { Component } from 'react'
import { Hidden } from '@material-ui/core'
import MiniDrawer from "./common/MiniDrawer"
import MobileDrawer from "./common/MobileDrawer"

//import views
import HomePage from "./views/homepage/HomePage"
import AnalysePage from "./views/analysepage/AnalysePage"

import openSocket from 'socket.io-client'
import PropTypes from 'prop-types'

import { estimateStartTime } from './utils/GeneralUtils'

import WordColor from './utils/WordColor.js'
import { DownsampleBuffer } from './utils/DownsampleBuffer.js'


let AudioContext
let context
let processor
let input
let globalStream
let analyser
let recorder

const initialState = {
	isRecording: false,
	elapsed: 0,
	transcript: [],
	volumes: [],
	interim: "",
	audioChunks: [],
	blobUrl: "",
	left: false,
	view: 0,
	wordColor: new WordColor()
}

class SpeechDismantler extends Component {
	constructor(props) {
		super(props)
		let { server_address } = props
		this.bufferSize = 2048
		this.socket = openSocket(server_address)
		this.state = initialState

		this.socket.on('connect', () => {
			this.socket.emit('join', 'Server Connected to Client')
		})

		this.socket.on('speechData', (data) => {
			const final = undefined || data.results[0].isFinal
			const result = data.results[0].alternatives[0].words
			const transcript = data.results[0].alternatives[0].transcript
			if (final === false) {
				this.setState({
					interim: transcript,
				})
			} else {
				var newTranscript = this.state.transcript.slice(0)
				var sentence = {
					startTime: 0,
					endTime: this.state.elapsed,
					words: result
				}
				const startTime = estimateStartTime(sentence, 1000)
				sentence.startTime = startTime

				newTranscript.push(sentence)
				this.setState({
					transcript: newTranscript,
				})
				console.log(newTranscript)
				this.state.wordColor.CalculateFrequencies(newTranscript)
			}
		})

		window.onbeforeunload = () => {
			if (this.state.isRecording) { this.socket.emit('endGoogleCloudStream', '') }
		}
	}

	/**
	 * Updates the elapsed time using AudioContext.currentTime
	 * @this {SpeechDismantler}
	 * @author Aleksi Suoranta
	 */
	tick = () => {
		const newElapsed = context.currentTime * 1000
		this.setState({ elapsed: newElapsed })
	}

	/**
	 * Resets the state information of the application
	 * @this {SpeechDismantler}
	 * @author Aleksi Suoranta
	 */
	reset = () => {
		this.stopRecording()
		this.setState(initialState, clearInterval(this.timer))
		this.setState({ wordColor: new WordColor() })
	}

	setView = (id) => {
		this.setState({ view: id })
	}

	/**
	 * Handles record toggling for the app
	 * @this {SpeechDismantler}
	 * @author Aleksi Suoranta
	 */
	toggleRecord = () => {
		const newIsRecording = !this.state.isRecording // state might not be updated if it is read after setState
		this.setState({
			isRecording: newIsRecording,
		},
			newIsRecording
				? () => {
					//this.start = new Date()
					this.timer = setInterval(this.tick, 10)
					if (context == null) {
						return this.handleListen()
					} else {
						recorder.resume()
						return context.resume()
					}
				}
				: () => {
					clearInterval(this.timer)
					recorder.pause()
					return context.suspend()
				})

	}

	/**
	 * Event handler for audio data, streams data through socket to the server
	 * @this {SpeechDismantler}
	 */
	streamAudioData = (e) => {
		const left = e.inputBuffer.getChannelData(0)
		const left16 = DownsampleBuffer(left, 44100, 16000)
		this.socket.emit('binaryData', left16)
	}

	/**
	 * Initializes webaudio components for recording
	 * @this {SpeechDismantler}
	 * @author Aleksi Suoranta
	 */
	handleListen = () => {
		this.socket.emit('startGoogleCloudStream', '') // init socket Google Speech Connection
		AudioContext = window.AudioContext || window.webkitAudioContext
		context = new AudioContext()
		context.suspend() //Stops the context timer here
		processor = context.createScriptProcessor(this.bufferSize, 1, 1)

		const handleSuccess = (stream) => {
			globalStream = stream
			recorder = new MediaRecorder(stream)
			input = context.createMediaStreamSource(stream)
			input.connect(processor)
			analyser = context.createAnalyser();
			//javascriptNode=audioContext.createScriptProcessor(2048,1,1);
			analyser.smoothingTimeConstant = 0.8;
			analyser.fftSize = 1024;
			analyser.connect(processor);
			processor.connect(context.destination)

			recorder.ondataavailable = (e) => {
				var newChunks = this.state.audioChunks.slice()
				newChunks.push(e.data)
				this.setState({
					audioChunks: newChunks
				})
				const audioBlob = new Blob(newChunks)
				const audioUrl = URL.createObjectURL(audioBlob)
				this.setState({
					blobUrl: audioUrl
				})
			}
			recorder.onpause = () => {
				recorder.requestData()

			}
			processor.onaudioprocess = (e) => {
				this.streamAudioData(e)
				var array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);
				var values = 0;
				var length = array.length;
				for (var i = 0; i < length; i++) {
					values += (array[i]);
				}
				var average = Math.round(values / length);
				var newVolumes = this.state.volumes.slice()
				var volumesObject = { time: this.state.elapsed, volume: average }

				this.state.wordColor.SetVolumes(volumesObject)

				newVolumes.push(volumesObject)
				//console.log(this.state.volumes)
				this.setState({
					volumes: newVolumes,
				})
			}
			//Recording and context timer are almost synced with this
			recorder.start()
			context.resume()
		}

		navigator.mediaDevices.getUserMedia({ audio: true })
			.then(handleSuccess)
	}

	/**
	 * Resets the web audio components
	 * @this {SpeechDismantler}
	 * @author Aleksi Suoranta
	 */
	stopRecording = () => {
		this.socket.emit('endGoogleCloudStream', '')
		//var tracks = null
		if (globalStream) {
			var tracks = globalStream.getTracks()
			for (var i = 0; i < tracks.length; i++) {
				tracks[i].stop()
			}
		}
		if (recorder) {
			recorder.stop()
		}
		if (input) {
			input.disconnect(processor)
		}
		if (processor) {
			processor.disconnect(context.destination)
		}
		if (context) {
			context.close().then(() => {
				input = null
				processor = null
				context = null
				AudioContext = null
				recorder = null
			})
		}

	}

	/**
	 * Reacts render, this is the root render for the app
	 * @this {SpeechDismantler}
	 */
	render() {

		const pageView = this.state.view
		let page

		if (pageView === 0) {
			page = <HomePage state={this.state} toggleRecord={this.toggleRecord} reset={this.reset} />
		} else {
			page = <AnalysePage state={this.state} />
		}
		return (
			<div>
				<div>
					<Hidden smDown>
						<MiniDrawer setView={this.setView} />
					</Hidden>
					<Hidden mdUp>
						<MobileDrawer setView={this.setView} />
					</Hidden>
				</div>
				<div>
					{page}
				</div>
			</div >
		)
	}
}

SpeechDismantler.propTypes = {
	server_address: PropTypes.string
}

export default SpeechDismantler
