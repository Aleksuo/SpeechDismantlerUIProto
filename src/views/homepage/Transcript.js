import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'


import Sentence from './Sentence'


class Transcript extends Component {
    //The reference is used to make transcript automatically scroll to the newest sentence

    transcriptEnd = React.createRef()
    currentlyPlaying = React.createRef()
    

    constructor(props) {
        super(props)
        this.state = {
            currentPlayback: 0,
            isPlaying: false
        }
        this.audio = React.createRef()
    }

    componentDidMount() {
        //this.scrollToBottom()
        this.audio.current.ontimeupdate = () => {
            this.setState({ currentPlayback: this.audio.current.currentTime })
        }

        this.audio.current.onloadedmetadata = () => {
            //A hack for a chrome bug: https://stackoverflow.com/questions/38443084/how-can-i-add-predefined-length-to-audio-recorded-from-mediarecorder-in-chrome/39971175
            this.audio.current.currentTime = 10000000 * Math.random()
        }

        this.audio.current.onplaying = () => {
            this.setState({ isPlaying: true })
        }

        this.audio.current.onpaused = () => {
            this.setState({ isPlaying: false })
        }
    }

    componentDidUpdate = () => {
        if (!this.audio.current.paused) {
            this.scrollToCurrentPlayback()
        } else {
            this.scrollToBottom()
        }
    }

    scrollToBottom = () => {
        this.transcriptEnd.current.scrollIntoView()
    }

    scrollToCurrentPlayback = () => {
        if(this.currentlyPlaying.current){
            this.currentlyPlaying.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    onSentenceClick = (e) => {
        this.audio.current.currentTime = (e) / 1000
        this.audio.current.play()
    }

    render = () => {
        const { transcript, blobUrl } = this.props
        const cur = this.state.currentPlayback * 1000
        const items = transcript.map((sentence, idx) => {
            return (
                <Sentence
                    key={idx}
                    isCurrent={(sentence.startTime <= cur) && (sentence.endTime >= cur) && this.state.isPlaying}
                    sentence={sentence}
                    onClick={() => this.onSentenceClick(sentence.startTime)}
                    ref={this.currentlyPlaying}

                />)
        })
        return (

            <div>
                <Paper elevation={1} style={{ maxHeight: "30vh", height: "30vh", overflow: "auto" }}>
                    <CSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                        <div>
                            <span>{items}</span>
                            <div ref={this.transcriptEnd} />
                        </div>

                    </CSSTransitionGroup>
                </Paper>


                <div style={{ marginTop: "7px" }}>
                    <audio ref={this.audio} src={blobUrl} controls type="audio/ogg" style={{ width: "100%" }}></audio>
                </div>
            </div>
        )

    }

}


Transcript.propTypes = {
    transcript: PropTypes.array,
    blobUrl: PropTypes.string
}

export default Transcript