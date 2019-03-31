import React from 'react'
import { Typography} from '@material-ui/core'
import PropTypes from 'prop-types'


import { millisecondsToTimeString } from '../../utils/GeneralUtils.js'

const Timer = ({ elapsed }) => {
    const time = millisecondsToTimeString(elapsed)
    return (
        <div>
            <Typography color="primary">{time}</Typography>
        </div>
    )
}

Timer.propTypes = {
    elapsed: PropTypes.number
}

export default Timer