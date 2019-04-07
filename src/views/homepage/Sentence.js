import React from 'react'
import {Typography, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'

import { millisecondsToTimeString } from '../../utils/GeneralUtils.js'

const Sentence = ({ sentence, wordCounter}) => {
    const items = sentence.words.map((word, idx) => {
    
    if(wordCounter.GetFrequency(word.word)>3){
        console.log('COLOR CHANGE'+word.word)
        return <span key={idx} style={{color:'red'}}>{word.word} </span>
    } else {
        return <span key={idx}>{word.word} </span>
    }
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