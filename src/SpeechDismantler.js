import React, { Component } from 'react'
import {SwipeableDrawer, List, ListItem, ListItemText, Hidden } from '@material-ui/core'
import MiniDrawer from "./MiniDrawer"

//import views
import HomePage from "./views/HomePage"

import ListItemIcon from '@material-ui/core/ListItemIcon'
import InfoIcon from '@material-ui/icons/Info'
import HomeIcon from '@material-ui/icons/Home'
import BarChartIcon from '@material-ui/icons/BarChart'
import BuildIcon from '@material-ui/icons/Build'

// import { VictoryBar, VictoryTheme, VictoryChart, VictoryPie } from 'victory';
import openSocket from 'socket.io-client'
import PropTypes from 'prop-types'

import {downsampleBuffer} from './utils/AudioUtils.js'

let AudioContext
let context
let processor
let input
let globalStream

const initialState = {
	isRecording: false,
	elapsed: 0,
	transcript: [],
	interim: "",
	left: false,
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

	tick = () =>{
		const newElapsed = this.state.elapsed + (new Date - this.last)
		this.setState({elapsed: newElapsed})
		this.last = new Date()
	}

	reset = () => {
		if (this.state.isRecording) {
			this.stopRecording()
		}
		this.setState(initialState, clearInterval(this.timer))
	}


	toggleRecord = () => {
		const newIsRecording = !this.state.isRecording // state might not be updated if it is read after setState
		this.setState({
			isRecording: newIsRecording,
		},
			newIsRecording
				? () =>{
					this.last = new Date()
					this.timer = setInterval(this.tick, 100)	
					return this.handleListen()}
				: () =>{
					clearInterval(this.timer)
					return this.stopRecording()})
		
	}

	streamAudioData = (e) => {
		const left = e.inputBuffer.getChannelData(0)
		const left16 = downsampleBuffer(left, 44100, 16000)
		this.socket.emit('binaryData', left16)
	}

	handleListen = () => {
		this.socket.emit('startGoogleCloudStream', '') // init socket Google Speech Connection
		console.log("went here")
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
				<HomePage state={this.state} toggleRecord={this.toggleRecord} reset={this.reset}/>

			</div >

		)
	}
}

SpeechDismantler.propTypes = {
	server_address: PropTypes.string
}

export default SpeechDismantler
