import React, { Component } from 'react'
import { Button, Paper, Grid, Fab, SwipeableDrawer, List, ListItem, ListItemText, Hidden } from '@material-ui/core'
import MicIcon from '@material-ui/icons/Mic'
import PauseIcon from '@material-ui/icons/Pause'
import MiniDrawer from "./MiniDrawer"

import ListItemIcon from '@material-ui/core/ListItemIcon'
import InfoIcon from '@material-ui/icons/Info'
import HomeIcon from '@material-ui/icons/Home'
import BarChartIcon from '@material-ui/icons/BarChart'
import BuildIcon from '@material-ui/icons/Build'

// import { VictoryBar, VictoryTheme, VictoryChart, VictoryPie } from 'victory';
import openSocket from 'socket.io-client'
import PropTypes from 'prop-types'

let AudioContext
let context
let processor
let input
let globalStream


const Transcript = ({ transcript }) => {
	const items = transcript.map((word, idx) => { return <span key={idx}>{word.word} </span> })
	return (
		<div>
			<Paper elevation={3} style={{ maxHeight: "30vh", height: "30vh", overflow: "auto" }}>
				{items}
			</Paper>
		</div>
	)
}


Transcript.propTypes = {
	transcript: PropTypes.array
}

const Interim = ({ interim }) => {
	return (
		<div>
			<Paper elevation={2} style={{ color: "gray", height: "5vh", textAlign: 'center', }}>
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
	transcript: [],
	interim: "",
	left: false,
	open: false
}

class SpeechDismantler extends Component {
	constructor(props) {
		super(props)
		let { server_address } = props
		this.bufferSize = 2048
		this.socket = openSocket(server_address)
		//this.socket = openSocket('https://speech-dismantler.herokuapp.com/')
		this.state = initialState

		this.socket.on('connect', () => {
			this.socket.emit('join', 'Server Connected to Client')
		})

		this.socket.on('messages', () => {
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
				Array.prototype.push.apply(newTranscript, result)
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

	/*	TOGGLE SWIPEABLE DRAWER (SLIDER SIDE NAV)*/

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open,
		})
	}


	/*UI CODE STARTS HERE*/


	render() {


		//const { classes } = this.props


		const sideListSwipeable = (
			<div>
				<List>
					<ListItem button key={'Home'}>
						<ListItemIcon><HomeIcon /></ListItemIcon>
						<ListItemIcon></ListItemIcon>
						<ListItemText primary={'Home'} />
					</ListItem>
					<ListItem button key={'Statistics'}>
						<ListItemIcon><BarChartIcon /></ListItemIcon>
						<ListItemIcon></ListItemIcon>
						<ListItemText primary={'Statistics'} />
					</ListItem>
					<ListItem button key={'Settings'}>
						<ListItemIcon><BuildIcon /></ListItemIcon>
						<ListItemIcon></ListItemIcon>
						<ListItemText primary={'Settings'} />
					</ListItem>
					<ListItem button key={'About'}>
						<ListItemIcon><InfoIcon /></ListItemIcon>
						<ListItemIcon></ListItemIcon>
						<ListItemText primary={'About'} />
					</ListItem>
				</List>
			</div>
		)


		return (

			<div>
				{/*
				<div>
					<Grid container
						spacing={24}
						direction="column"
						alignItems="left"
						justify="space-evenly">
						<Hidden ndUp>
							<Grid item xs={12} md={12}>
								<Button onClick={this.toggleDrawer('left', true)}>OPEN SWIPE</Button>
							</Grid>
						</Hidden>
					</Grid>
				</div>
				*/}

				<Hidden smDown>
					<MiniDrawer />
				</Hidden>

				<div>
					<Hidden mdUp>
						<SwipeableDrawer
							open={this.state.left}
							onClose={this.toggleDrawer('left', false)}
							onOpen={this.toggleDrawer('left', true)}
						>
							<div
								tabIndex={0}
								role="button"
								onClick={this.toggleDrawer('left', false)}
								onKeyDown={this.toggleDrawer('left', false)}
							>
								{sideListSwipeable}
							</div>
						</SwipeableDrawer>
					</Hidden>

				</div>

				<div>
					<Grid container
						spacing={24}
						direction="column"
						alignItems="center"
						justify="flex-end"
					>
						<Grid item xs={12}>
							<Fab aria-label="mic" color={this.state.isRecording ? 'secondary' : 'primary'} onClick={this.toggleRecord}>
								{this.state.isRecording ? <PauseIcon /> : <MicIcon />}
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

			</div >

		)
	}
}

SpeechDismantler.propTypes = {
	server_address: PropTypes.string
}

export default SpeechDismantler
