import React from 'react'
import {Typography, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'

import { millisecondsToTimeString } from '../../utils/GeneralUtils.js'

const Sentence = React.forwardRef((props, ref) => {
    console.log(isCurrent)
    const { sentence, onClick, isCurrent} = props
    const style = isCurrent ? {borderColor: "#2196f3", borderStyle: "solid"} : {}
    const items = sentence.words.map((word, idx) => { return <span key={idx}>{word.word} </span>})
    const refElement = isCurrent ? <div ref={ref}></div>:<div></div>
    return (<div onClick={onClick} style={style} ref={ref}>
        <Typography align="center" color="primary">{millisecondsToTimeString(sentence.startTime)}</Typography>
        <Typography paragraph={true} align="center">{items}</Typography>
        <Divider variant="middle" light={true} />
        {refElement}
    </div>)
})

Sentence.propTypes = {
    sentence: PropTypes.object
}

export default Sentence