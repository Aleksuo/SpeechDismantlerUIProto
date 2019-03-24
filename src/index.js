/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import SpeechDismantler from './SpeechDismantler'

const server_address = process.env.SERVER_ADDRESS || "http://localhost:3001" 
ReactDOM.render(<SpeechDismantler server_address={server_address}/>, document.getElementById('root'))