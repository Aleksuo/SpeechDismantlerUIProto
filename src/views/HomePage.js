import React, { Component } from 'react'
import { Button, Paper, Grid, Fab, Typography, Divider } from '@material-ui/core'
import MicIcon from '@material-ui/icons/Mic'
import PauseIcon from '@material-ui/icons/Pause'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import { millisecondsToTimeString } from '../utils/GeneralUtils.js'

const Timer = ({ elapsed }) => {
    const time = millisecondsToTimeString(elapsed)
    return (
        <div>
            <Typography color="primary">{time}</Typography>
        </div>
    )
}

Timer.propTypes = {
    elapsed: PropTypes.number
}

const Sentence = ({ sentence }) => {
    const items = sentence.words.map((word, idx) => { return <span key={idx}>{word.word} </span> })
    return (<div>
        <Typography align="center" color="primary">{millisecondsToTimeString(sentence.time)}</Typography>
        <Typography paragraph="true" align="center">{items}</Typography>
        <Divider variant="middle" light={true} />
    </div>)
}

Sentence.propTypes = {
    sentence: PropTypes.object
}

class Transcript extends Component {
    //The reference is used to make transcript automatically scroll to the newest sentence
    transcriptEnd = React.createRef()

    componentDidMount = () => {
        this.scrollToBottom()
    }

    componentDidUpdate = () => {
        this.scrollToBottom()
    }
    scrollToBottom = () => {
        this.transcriptEnd.current.scrollIntoView({ behavior: 'smooth' })
    }

    render() {
        const { transcript } = this.props
        const items = transcript.map((sentence, idx) => <Sentence key={idx} sentence={sentence} />)
        return (
            <div>
                <Paper elevation={1} style={{ maxHeight: "30vh", height: "30vh", overflow: "auto" }}>
                    <CSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                        {items}
                        <div ref={this.transcriptEnd} /> {/*Dummy div to mark the end of transcript*/}
                    </CSSTransitionGroup>
                </Paper>
            </div>
        )

    }

}


Transcript.propTypes = {
    transcript: PropTypes.array
}

const Interim = ({ interim }) => {
    return (
        <div>
            <Paper elevation={2} style={{ color: "gray", height: "5vh", textAlign: 'center', overflow: "auto" }}>
                <Typography color="inherit">{interim}</Typography>
            </Paper>
        </div>
    )
}



Interim.propTypes = {
    interim: PropTypes.string
}



const HomePage = (props) => {
    const { state, toggleRecord, reset } = props

    return (
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
                    <Timer elapsed={state.elapsed} />
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

HomePage.propTypes = {
    state: PropTypes.object,
    toggleRecord: PropTypes.func,
    reset: PropTypes.func
}

export default HomePage