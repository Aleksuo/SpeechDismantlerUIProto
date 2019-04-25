import React from 'react'
import { Button, Grid, Fab, AppBar, Tabs, Tab, Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MicIcon from '@material-ui/icons/Mic'
import PauseIcon from '@material-ui/icons/Pause'
import PropTypes from 'prop-types'

import Interim from './Interim'
import Transcript from './Transcript'
import Timer from './Timer'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    lightTooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
    lightIndicator:{
        height: "4px",
        color: 'rgba(0, 0, 0, 0.87)'
    },
})

/**
 * A stateless component that contains they layout of the home page
 * @author Aleksi Suoranta
 * @param {*} props 
 */
const HomePage = (props) => {
    const { state, toggleRecord, reset, setHighLight, classes } = props
    return (
        <div>
            <Grid container
                spacing={16}
                direction="column"
                alignItems="center"
                justify="flex-end"
            >
                <Grid item xs={12}>
                <Tooltip title="Start/stop recording" classes={{ tooltip: classes.lightTooltip }}>
                    <Fab aria-label="mic" color={state.isRecording ? 'secondary' : 'primary'} onClick={toggleRecord}>
                        {state.isRecording ? <PauseIcon /> : <MicIcon />}
                    </Fab>
                </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <Timer elapsed={state.elapsed} />
                </Grid>
                <Grid item xs={6} md={3} style={{ width: "100%", height: "100%" }}>
                    <Interim interim={state.interim} />
                </Grid>
                <Grid item xs={12} md={6} style={{ width: "100%" }}>

                </Grid>
                <Grid item xs={12} md={6} style={{ width: "100%", height: "100%" }}>
                    <AppBar position="static" color="primary" elevation={1} style={{ background: "#2196f3" }}>

                        <Tabs
                            variant="fullWidth"
                            value={state.highlight}
                            classes={{ indicator: classes.lightIndicator}}
                        >
                            <Tab style={{ display: "none" }}></Tab>
                            <Tooltip title="Highlight filler words" classes={{ tooltip: classes.lightTooltip }}>
                                <Tab onClick={() => { setHighLight(1) }} label="Fillers"></Tab>
                            </Tooltip>
                            <Tooltip title="Highlight commonly used words" classes={{ tooltip: classes.lightTooltip }}>
                                <Tab onClick={() => { setHighLight(2) }} label="Frequencies"></Tab>
                            </Tooltip>
                            <Tooltip title="Highlight volume levels" classes={{ tooltip: classes.lightTooltip }}>
                                <Tab onClick={() => { setHighLight(3) }} label="Volumes"></Tab>
                            </Tooltip>

                        </Tabs>


                    </AppBar>

                    <Transcript transcript={state.transcript} blobUrl={state.blobUrl} wordColor={state.wordColor} isRecording={state.isRecording} />
                </Grid>
                <Grid item xs={12}>
                    <Tooltip title="Reset the app" classes={{ tooltip: classes.lightTooltip }}>
                        <Button variant="contained" color="secondary" onClick={() => { if (window.confirm("Are you sure you want to reset the app?")) { reset() } }}>Reset</Button>
                    </Tooltip>
                </Grid>
            </Grid>
        </div>)
}

HomePage.propTypes = {
    state: PropTypes.object,
    toggleRecord: PropTypes.func,
    reset: PropTypes.func,
    setHighLight: PropTypes.func,
    classes: PropTypes.object
}
export default withStyles(styles, { withTheme: true })(HomePage)