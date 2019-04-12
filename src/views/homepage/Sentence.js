import React from 'react'
import {Typography, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'

import { millisecondsToTimeString } from '../../utils/GeneralUtils.js'

const Sentence = ({ sentence, wordColor}) => {
    const items = sentence.words.map((word, idx) => {
        var color = wordColor.GetColor(word)
        return <span key={idx} style={{color:color}}>{word.word} </span>
})
    
    return (<div>
        <Typography align="center"color="primary">{millisecondsToTimeString(sentence.startTime)}</Typography>
        <Typography paragraph={true} align="center">{items}</Typography>
        <Divider variant="middle" light={true} />
    </div>)
}

Sentence.propTypes = {
    sentence: PropTypes.object
}

export default Sentence