/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import SpeechDismantler from './SpeechDismantler'
var server_address = "https://speech-dismantler.herokuapp.com/" 
if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    server_address = "http://localhost:3001" 
ReactDOM.render(<SpeechDismantler server_address={server_address}/>, document.getElementById('root'))