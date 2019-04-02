import React, { Component } from 'react'
import { Paper} from '@material-ui/core'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import Sentence from './Sentence'

class Transcript extends Component {
    //The reference is used to make transcript automatically scroll to the newest sentence
    transcriptEnd = React.createRef()

    componentDidMount() {
        this.scrollToBottom()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }
    
    scrollToBottom() {
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
                        <div>
                            <span>{items}</span>
                            <div ref={this.transcriptEnd} />
                        </div>

                    </CSSTransitionGroup>
                </Paper>
            </div>
        )

    }

}


Transcript.propTypes = {
    transcript: PropTypes.array
}

export default Transcript