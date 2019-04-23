import React from 'react'
import { Typography, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'

import { millisecondsToTimeString } from '../../utils/GeneralUtils.js'

/**
 * A stateless component for displaying the recognized sentences in the transcript
 * @param {*} props
 * @param {} ref
 * @author Aleksi Suoranta
 */
const Sentence = React.forwardRef((props, ref) => {
    const { sentence, onClick, isCurrent } = props
    const style = isCurrent ? { borderColor: "#2196f3", borderStyle: "solid" } : {}
    const items = sentence.words.map((word, idx) => { return <span key={idx}>{word.word} </span> })
    const refElement = isCurrent ? <div ref={ref}></div> : <div></div>
    return (
        <div>
            {refElement}
            <div onClick={onClick} style={style}>
                <Typography align="center" color="primary">{millisecondsToTimeString(sentence.startTime)}</Typography>
                <Typography paragraph={true} align="center">{items}</Typography>
                <Divider variant="middle" light={true} />
            </div>
        </div>)
})

Sentence.propTypes = {
    sentence: PropTypes.object,
    onClick: PropTypes.func,
    isCurrent: PropTypes.bool
}

export default Sentence