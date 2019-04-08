import React, { Component } from 'react'
import { Hidden } from '@material-ui/core'
import MiniDrawer from "./common/MiniDrawer"
import MobileDrawer from "./common/MobileDrawer"

//import views
import HomePage from "./views/homepage/HomePage"
import AnalysePage from "./views/analysepage/AnalysePage"

import openSocket from 'socket.io-client'
import PropTypes from 'prop-types'

import { downsampleBuffer } from './utils/AudioUtils.js'
import { estimateStartTime } from './utils/GeneralUtils'


let AudioContext
let context
let processor
let input
let globalStream
let recorder

const initialState = {
	isRecording: false,
	elapsed: 0,
	transcript: [],
	interim: "",
	audioChunks: [],
	blobUrl: "",
	left: false,
	view: 0
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

	Float32Concat = (first, second) => {
		var firstLength = first.length,
			result = new Float32Array(firstLength + second.length);

		result.set(first);
		result.set(second, firstLength);

		return result;
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
		const left16 = downsampleBuffer(left, 44100, 16000)
		this.socket.emit('binaryData', left16)
	}

	handleListen = () => {
		this.socket.emit('startGoogleCloudStream', '') // init socket Google Speech Connection
		AudioContext = window.AudioContext || window.webkitAudioContext
		context = new AudioContext()
		processor = context.createScriptProcessor(this.bufferSize, 1, 1)
		processor.connect(context.destination)
		context.resume()

		const handleSuccess = (stream) => {
			globalStream = stream
			recorder = new MediaRecorder(stream)
			
			console.log(recorder.state)
			input = context.createMediaStreamSource(stream)
			input.connect(processor)

			recorder.ondataavailable = (e) => {
				var newChunks = this.state.audioChunks.slice()
				newChunks.push(e.data)
				this.setState({
					audioChunks: newChunks
				})
				console.log(newChunks)
			}

			recorder.onstop = () =>{
				const audioBlob = new Blob(this.state.audioChunks)
				const audioUrl = URL.createObjectURL(audioBlob)
				const audio = new Audio(audioUrl)
				this.setState({
					blobUrl: audioUrl
				})
				
				//const audio = new Audio(audioUrl)
				//audio.play()
			}

			processor.onaudioprocess = (e) => {
				this.streamAudioData(e)
			}
			recorder.start()
		}

		navigator.mediaDevices.getUserMedia({ audio: true, video: false })
			.then(handleSuccess)
	}

	stopRecording = () => {
		this.socket.emit('endGoogleCloudStream', '')

		const track = globalStream.getTracks()[0]
		recorder.stop()
		track.stop()
		input.disconnect(processor)
		processor.disconnect(context.destination)
		context.close().then(() => {
			input = null
			processor = null
			context = null
			AudioContext = null
			recorder = null
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
