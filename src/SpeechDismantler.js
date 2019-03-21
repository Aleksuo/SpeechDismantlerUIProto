import React, { Component } from 'react'
import { Button, Paper, Typography, Grid, Fab, Icon } from '@material-ui/core'
import MicIcon from '@material-ui/icons/Mic'
import PauseIcon from '@material-ui/icons/Pause'

// import { VictoryBar, VictoryTheme, VictoryChart, VictoryPie } from 'victory';
import openSocket from 'socket.io-client'
import PropTypes from 'prop-types'

let AudioContext
let context
let processor
let input
let globalStream


//This is a test comment for Travis builds

const Transcript = ({ transcript }) => {
	
	return (
		<div>
			<Paper elevation={1}>		
				{transcript}
			</Paper>
		</div>
	)
}

Transcript.propTypes = {
	transcript: PropTypes.string
}

const Interim = ({ interim }) => {
	return (
		<div>
			<Paper elevation={2} style={{color:"gray"}}>		
				{interim}
			</Paper>
		</div>
	)
}

Interim.propTypes = {
	interim: PropTypes.string
}

const initialState = {
	isRecording: false,
	transcript: '',
	interim: '',
}

class SpeechDismantler extends Component {
	constructor(props) {
		super(props)
		this.bufferSize = 2048
		//this.socket = openSocket('http://localhost:3001')
		this.socket = openSocket('https://protected-oasis-47231.herokuapp.com')
		this.state = initialState

		this.socket.on('connect', () => {
			this.socket.emit('join', 'Server Connected to Client')
		})

		this.socket.on('messages', () => {
		})

		this.socket.on('speechData', (data) => {
			const final = undefined || data.results[0].isFinal
			const result = data.results[0].alternatives[0].transcript
			if (final === false) {
				// The returned transcript is not finished
				this.setState({
					interim: result,
				})
			} else {
				const newTranscript = `${this.state.transcript} ${result}`
				this.setState({
					transcript: newTranscript,
				})
			}
		})

		window.onbeforeunload = () => {
			if (this.state.isRecording) { this.socket.emit('endGoogleCloudStream', '') }
		}
	}

	reset = () => {
		if (this.state.isRecording) {
			this.stopRecording()
		}
		this.setState(initialState)
	}


	toggleRecord = () => {
		const newIsRecording = !this.state.isRecording // state might not be updated if it is read after setState
		this.setState({
			isRecording: newIsRecording,
		},
			newIsRecording
				? this.handleListen
				: this.stopRecording)
	}

	streamAudioData = (e) => {
		const left = e.inputBuffer.getChannelData(0)
		const left16 = this.downsampleBuffer(left, 44100, 16000)
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
			input = context.createMediaStreamSource(stream)
			input.connect(processor)
			processor.onaudioprocess = (e) => {
				this.streamAudioData(e)
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

	downsampleBuffer = (buffer, sampleRate, outSampleRate) => {
		if (outSampleRate === sampleRate) {
			return buffer
		}
		/*
		if (outSampleRate > sampleRate) {
			throw 'downsampling rate show be smaller than original sample rate'
		}
		*/
		const sampleRateRatio = sampleRate / outSampleRate
		const newLength = Math.round(buffer.length / sampleRateRatio)
		const result = new Int16Array(newLength)
		let offsetResult = 0
		let offsetBuffer = 0
		while (offsetResult < result.length) {
			const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio)
			let accum = 0; let
				count = 0
			for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
				accum += buffer[i]
				count++
			}

			result[offsetResult] = Math.min(1, accum / count) * 0x7FFF
			offsetResult++
			offsetBuffer = nextOffsetBuffer
		}
		return result.buffer
	}

	render() {
		return (
			<div>
				<Grid container
					spacing={24}
					direction="column"
					alignItems="center"
					justify="space-evenly">
					<Grid item xs={12} md={12}>
						<Fab aria-label="mic" color={this.state.isRecording ? 'secondary' : 'primary'} onClick={this.toggleRecord}>
							{this.state.isRecording ? <PauseIcon/> : <MicIcon/>}
						</Fab>
					</Grid>
					<Grid item xs={6} md={3} style={{ width: "100%", height: "100%" }}>
						<Interim interim={this.state.interim} />
					</Grid>
					<Grid item xs={12} md={6} style={{ width: "100%", height: "100%" }}>
						<Transcript transcript={this.state.transcript} />
					</Grid>
					<Grid item xs={12}>
						<Button variant="contained" onClick={this.reset}>Reset</Button>
					</Grid>
				</Grid>
			</div>
			/*
			<div style={parentContainerStyles}>
				<div style={subContainerStyles}>
					<div className="center-block text-center">

					</div>
					<div className="center-block text-center">
						<div style={container}>

						</div>
						
					</div>


				</div>
				*/
		)
	}
}

export default SpeechDismantler
