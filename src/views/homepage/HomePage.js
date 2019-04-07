import React from 'react'
import { Button, Grid, Fab} from '@material-ui/core'
import MicIcon from '@material-ui/icons/Mic'
import PauseIcon from '@material-ui/icons/Pause'
import PropTypes from 'prop-types'

import Interim from './Interim'
import Transcript from './Transcript'
import Timer from './Timer'

const HomePage = (props) => {
    const { state, toggleRecord, reset } = props
    return (
        <div>
            <Grid container
                spacing={24}
                direction="column"
                alignItems="center"
                justify="flex-end"
            >
                <Grid item xs={12}>
                    <Fab aria-label="mic" color={state.isRecording ? 'secondary' : 'primary'} onClick={toggleRecord}>
                        {state.isRecording ? <PauseIcon /> : <MicIcon />}
                    </Fab>
                </Grid>
                <Grid item xs={12}>
                    <Timer elapsed={state.elapsed} />
                </Grid>
                <Grid item xs={6} md={3} style={{ width: "100%", height: "100%" }}>
                    <Interim interim={state.interim} />
                </Grid>
                <Grid item xs={12} md={6} style={{ width: "100%", height: "100%" }}>
                    <Transcript transcript={state.transcript} wordCounter = {state.wordCounter}/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={reset}>Reset</Button>
                </Grid>
            </Grid>
        </div>)
}

HomePage.propTypes = {
    state: PropTypes.object,
    toggleRecord: PropTypes.func,
    reset: PropTypes.func
}

export default HomePage