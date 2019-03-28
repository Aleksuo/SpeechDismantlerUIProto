import React, { Component } from 'react'
import {Typography, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'

import { millisecondsToTimeString } from '../../utils/GeneralUtils.js'

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

export default Sentence