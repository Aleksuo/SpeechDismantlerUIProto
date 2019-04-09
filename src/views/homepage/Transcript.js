import React, { Component } from 'react'
import { Paper} from '@material-ui/core'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import Sentence from './Sentence'

/*
class Playback extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            
        )
    }

}
*/

class Transcript extends Component {
    //The reference is used to make transcript automatically scroll to the newest sentence
    transcriptEnd = React.createRef()
    audio = React.createRef()
    
    
    constructor(props){
        super(props)
        this.state = {
            currentPlayback: 0
        }
    }

    componentDidMount() {
        this.scrollToBottom()
        this.audio.current.ontimeupdate = (e) =>{
            this.setState({currentPlayback: this.audio.current.currentTime})
        }
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }
    
    scrollToBottom() {
        this.transcriptEnd.current.scrollIntoView({ behavior: 'smooth' })
    }

    onSentenceClick = (e) =>{
        //console.log(this.audio)
        this.audio.current.currentTime = Math.floor((e-200)/1000)
        this.audio.current.play()
    }

    render = () => {
        const { transcript, blobUrl } = this.props
        const cur = this.state.currentPlayback * 1000
        console.log(cur)
        const items = transcript.map((sentence, idx) => 
        {return(
            <Sentence key={idx} isCurrent={(sentence.startTime < cur) && (sentence.endTime > cur) } sentence={sentence} onClick={() => this.onSentenceClick(sentence.startTime)} />)
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
                <div>
                    <audio ref={this.audio} src={blobUrl} controls type="audio/ogg"></audio>
                </div>
            </div>
        )

    }

}


Transcript.propTypes = {
    transcript: PropTypes.array
}

export default Transcript