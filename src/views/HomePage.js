import React from 'react'
import { Button, Paper, Grid, Fab} from '@material-ui/core'
import MicIcon from '@material-ui/icons/Mic'
import PauseIcon from '@material-ui/icons/Pause'
import PropTypes from 'prop-types'

const Timer = ({elapsed}) =>{
	const elapsedSec = Math.round(elapsed/1000)
	const min = Math.floor(elapsedSec/60)
	const sec = elapsedSec-(min*60)
	return(
		<div>
			<h2>{min}:{sec}</h2>
		</div>
	)
}


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



const HomePage = (props) =>{ 
    const {state, toggleRecord, reset} = props

    return(
            <div>
					<Grid container
						spacing={24}
						direction="column"
						alignItems="center"
						justify="flex-end"
					>
						<Grid item xs={12}>
							<Fab aria-label="mic" color={state.isRecording ? 'secondary' : 'primary'} onClick={toggleRecord}>
								{state.isRecording ? <PauseIcon /> : <MicIcon />}
							</Fab>
						</Grid>
						<Grid item xs={12}>
							<Timer elapsed={state.elapsed}/>
						</Grid>
						<Grid item xs={6} md={3} style={{ width: "100%", height: "100%" }}>
							<Interim interim={state.interim} />
						</Grid>
						<Grid item xs={12} md={6} style={{ width: "100%", height: "100%" }}>
							<Transcript transcript={state.transcript} />
						</Grid>
						<Grid item xs={12}>
							<Button variant="contained" onClick={reset}>Reset</Button>
						</Grid>
					</Grid>
				</div>)
}

export default HomePage