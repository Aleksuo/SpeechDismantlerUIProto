import React from 'react'
import {Typography, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'

import { millisecondsToTimeString } from '../../utils/GeneralUtils.js'

const Sentence = ({ sentence, onClick, isCurrent }) => {
    console.log(isCurrent)
    const style = isCurrent ? {borderColor: "#2196f3", borderStyle: "solid"} : {}
    const items = sentence.words.map((word, idx) => { return <span key={idx}>{word.word} </span>})
    return (<div onClick={onClick} style={style}>
        <Typography align="center" color="primary">{millisecondsToTimeString(sentence.startTime)}</Typography>
        <Typography paragraph={true} align="center">{items}</Typography>
        <Divider variant="middle" light={true} />
    </div>)
}

Sentence.propTypes = {
    sentence: PropTypes.object
}

export default Sentence