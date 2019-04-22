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

const initialState = {
	isRecording: false,
	elapsed: 0,
	transcript: [],
	volumes: [],
	interim: "",
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
				const startTime = estimateStartTime(sentence)
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

	tick = () => {
		const newElapsed = this.state.elapsed + (new Date() - this.last)
		this.setState({ elapsed: newElapsed })
		this.last = new Date()
	}

	reset = () => {
		if (this.state.isRecording) {
			this.stopRecording()
		}
		this.setState(initialState, clearInterval(this.timer))
	}

	setView = (id) => {
		this.setState({ view: id })
	}


	toggleRecord = () => {
		const newIsRecording = !this.state.isRecording // state might not be updated if it is read after setState
		this.setState({
			isRecording: newIsRecording,
		},
			newIsRecording
				? () => {
					this.last = new Date()
					this.timer = setInterval(this.tick, 100)
					return this.handleListen()
				}
				: () => {
					clearInterval(this.timer)
					return this.stopRecording()
				})

	}

	streamAudioData = (e) => {
		const left = e.inputBuffer.getChannelData(0)
		const left16 = DownsampleBuffer(left, 44100, 16000)
		this.socket.emit('binaryData', left16)
	}

	handleListen = () => {
		this.socket.emit('startGoogleCloudStream', '') // init socket Google Speech Connection
		AudioContext = window.AudioContext || window.webkitAudioContext
		context = new AudioContext()
		processor = context.createScriptProcessor(this.bufferSize, 1, 1)
		context.resume();
		//createCanvas(200,200);


		const handleSuccess = (stream) => {
			globalStream = stream
			input = context.createMediaStreamSource(stream)
			input.connect(processor)
			processor.connect(context.destination)
			//audioContext=new AudioContext();
			analyser = context.createAnalyser();
			//javascriptNode=audioContext.createScriptProcessor(2048,1,1);
			analyser.smoothingTimeConstant = 0.8;
			analyser.fftSize = 1024;
			input.connect(analyser);
			analyser.connect(processor);
			processor.connect(context.destination);
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
		}
		navigator.mediaDevices.getUserMedia({ audio: true, video: false })
			.then(handleSuccess)
	}

	stopRecording = () => {
		this.socket.emit('endGoogleCloudStream', '')


		const track = globalStream.getTracks()[0]
		track.stop()

		input.disconnect(processor)
		processor.disconnect(context.destination)
		context.close().then(() => {
			input = null
			processor = null
			context = null
			AudioContext = null
		})
	}

	//UI CODE STARTS HERE*/
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
