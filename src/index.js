import React from 'react'
import ReactDOM from 'react-dom'
import SpeechDismantler from './SpeechDismantler'

const server_address = process.env.SERVER_ADDRESS || "http://localhost:3001" 
ReactDOM.render(<SpeechDismantler server_address={server_address}/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
