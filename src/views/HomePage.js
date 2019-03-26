import React, { Component } from 'react'
import { Button, Paper, Grid, Fab } from '@material-ui/core'
import MicIcon from '@material-ui/icons/Mic'
import PauseIcon from '@material-ui/icons/Pause'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import { millisecondsToTimeString } from '../utils/GeneralUtils.js'

const Timer = ({ elapsed }) => {
    const time = millisecondsToTimeString(elapsed)
    return (
        <div>
            <h2>{time}</h2>
        </div>
    )
}

Timer.propTypes = {
    elapsed: PropTypes.number
}

const fadein = {
    transition: "opacity 0.5s",
    opacity: "1",
}

const Sentence = ({ sentence }) => {
    console.log(sentence)
    const items = sentence.words.map((word, idx) => { return <span key={idx}>{word.word} </span> })
    console.log(items)
    return (<div>
        <h3>{millisecondsToTimeString(sentence.time)}:</h3>
        <p>{items}</p>
    </div>)
}

class Transcript extends Component {
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
        const items = transcript.map((sentence,idx) => <Sentence key={idx} sentence={sentence} />)
        return (
            <div>
                <Paper elevation={1} style={{ maxHeight: "30vh", height: "30vh", overflow: "auto" }}>
                    <CSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                        {items}
                        <div ref={this.transcriptEnd} />
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
            <Paper elevation={2} style={{ color: "gray", height: "5vh", textAlign: 'center', }}>
                {interim}
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