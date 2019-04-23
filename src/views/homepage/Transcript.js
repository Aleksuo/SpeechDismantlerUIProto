import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'


import Sentence from './Sentence'

/**
 * A component that displays the transcript elements
 * @author Aleksi Suoranta
 */
class Transcript extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPlayback: 0,
            isPlaying: false
        }
        this.audio = React.createRef()
        //scroll to these references
        this.transcriptEnd = React.createRef()
        this.currentlyPlaying = React.createRef()
    }

    /**
     * Binds event handlers to the html audio element here
     * @this {Transcript}
     * @author Aleksi Suoranta
     */
    componentDidMount() {
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

    /**
     * Scroll the transcript on updates when needed
     * @this {Transcript}
     * @author Aleksi Suoranta
     */
    componentDidUpdate = () => {
        if (!this.audio.current.paused) {
            this.scrollToCurrentPlayback()
        } else {
            this.scrollToBottom()
        }
    }

    /**
     * Scrolls to the end of the transcript marked by reference div
     * @this {Transcript}
     * @author Aleksi Suoranta
     */
    scrollToBottom = () => {
        this.transcriptEnd.current.scrollIntoView()
    }

    /**
     * Scrolls to the sentence that is currently played, marked by reference div.
     * @this {Transcript}
     * @author Aleksi Suoranta
     */
    scrollToCurrentPlayback = () => {
        if(this.currentlyPlaying.current){
            this.currentlyPlaying.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    /**
     * Event handler for clicking sentences, starts playback on click.
     * @this {Transcript}
     * @author Aleksi Suoranta
     * @param {number} time
     */
    onSentenceClick = (time) => {
        this.audio.current.currentTime = (time) / 1000
        this.audio.current.play()
    }

    render = () => {
        const { transcript, blobUrl, wordColor } = this.props
        const cur = this.state.currentPlayback * 1000
        const items = transcript.map((sentence, idx, arr) => {
            const next = arr[idx+1] ? arr[idx+1].startTime : Number.MAX_VALUE
            return (
                <Sentence
                    wordColor={wordColor}
                    key={idx}
                    isCurrent={(sentence.startTime <= cur) && (next >= cur) && this.state.isPlaying}
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