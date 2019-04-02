import React from 'react'
import {Paper, Typography} from '@material-ui/core'
import PropTypes from 'prop-types'

const Interim = ({ interim }) => {
    return (
        <div>
            <Paper elevation={2} style={{ color: "gray", height: "5vh", textAlign: 'center', overflow: "auto" }}>
                <Typography color="inherit">{interim}</Typography>
            </Paper>
        </div>
    )
}

Interim.propTypes = {
    interim: PropTypes.string
}

export default Interim