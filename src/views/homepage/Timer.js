import React from 'react'
import { Typography} from '@material-ui/core'
import PropTypes from 'prop-types'


import { millisecondsToTimeString } from '../../utils/GeneralUtils.js'

/**
 * A stateless component used for displaying the elapsed time.
 * @author Aleksi Suoranta
 * @param {number} elapsed
 */
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