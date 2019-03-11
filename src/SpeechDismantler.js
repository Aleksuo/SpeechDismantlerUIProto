import React, { Component } from 'react';
import { Button, Dropdown, Navbar } from 'react-bootstrap';
import { VictoryBar, VictoryTheme, VictoryChart, VictoryPie } from 'victory';
import openSocket from 'socket.io-client';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
//const socket = new WebSocket("ws://localhost:8000");
const socket = openSocket('http://localhost:5000');

socket.on('analysis',(data)=>{
  console.log(data)
})


class SpeechDismantler extends Component {

  constructor(props) {
    super(props);
    this.bufferSize = 4096;
    this.state = {
      isRecording: false,
      isAnalyzing: false
    };

    this.toggleRecord = this.toggleRecord.bind(this)
    this.startAnalyze = this.startAnalyze.bind(this)
    this.handleListen = this.handleListen.bind(this)
    this.streamAudioData = this.streamAudioData.bind(this)
    this.float32To16BitPCM = this.float32To16BitPCM.bind(this)
  }


  toggleRecord() {
    console.log("p")
    this.setState({
      isRecording: !this.state.isRecording
    }, this.handleListen);
  }

  startAnalyze() {
    console.log("p")
    this.setState(state => ({
      isAnalyzing: !state.isAnalyzing
    }));
  }

  handleListen(stream, callback) {
    if (!audioContext) {
      console.log("Oh no!")
      return;
    }
    /*
    socket.emit('init', JSON.stringify({
      rate: audioContext.sampleRate,
      language: "en-US",
      format: "LINEAR16"
    }));
    */

    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {
      /*
      socket.send(JSON.stringify({
        rate: audioContext.sampleRate,
        language: "en-US",
        format: "LINEAR16"
      }));
      */

      const inputPoint = audioContext.createGain();
      //console.log (value)
      const microphone = audioContext.createMediaStreamSource(stream);
      const analyzer = audioContext.createAnalyser();
      var scriptProcessor = inputPoint.context.createScriptProcessor(this.bufferSize, 1, 1);

      microphone.connect(inputPoint);
      inputPoint.connect(analyzer);
      inputPoint.connect(scriptProcessor);
      scriptProcessor.connect(inputPoint.context.destination);
      scriptProcessor.addEventListener('audioprocess', this.streamAudioData);
      console.log("init done")
    });
  }

   float32To16BitPCM(float32Arr){
    var pcm16bit = new Int16Array(float32Arr.length);
    for(var i = 0; i< float32Arr.length; ++i){
      var s = Math.max(-1, Math.min(1, float32Arr[i]));
      /**
           * convert 32 bit float to 16 bit int pcm audio
           * 0x8000 = minimum int16 value, 0x7fff = maximum int16 value
           */
      pcm16bit[i] = s < 0 ? s*0x800: s* 0x7FFF;
    }
    return pcm16bit;
  }

  streamAudioData(e) {
    debugger
    console.log(e);
    const floatSamples = e.inputBuffer.getChannelData(0);
    var pcm16Audio = this.float32To16BitPCM(floatSamples);
    socket.emit('audio', pcm16Audio.buffer);
    
  }






  render() {




    const parentContainerStyles = {
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'table'
    };

    const subContainerStyles = {
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'table-cell',
      verticalAlign: 'middle'
    };

    const container = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }
    const button = {
      width: '60px',
      height: '60px',
      background: 'lightblue',
      borderRadius: '50%',
      margin: '6em 0 2em 0'
    }
    const interim = {
      color: 'gray',
      border: '#ccc 1px solid',
      padding: '1em',
      margin: '1em',
      width: '300px'
    }
    const final = {
      color: 'black',
      border: '#ccc 1px solid',
      padding: '1em',
      margin: '1em',
      width: '300px'
    }


    if (this.state.isAnalyzing) {
      return (
        <div>
          <Navbar bg="dark" sticky="top">
            <Button onClick={this.startAnalyze}>Back</Button>
          </Navbar>
          <h1 align="center">Statistics</h1>
          <div className="center-block">
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={10}

            >
              <VictoryBar
                style={{ data: { fill: "#c43a31" } }}

              />
            </VictoryChart>
            <VictoryPie
              data={[
                { x: "Cats", y: 35 },
                { x: "Dogs", y: 40 },
                { x: "Birds", y: 55 }
              ]}
            />
          </div>
          <div className="center-block text-center">

          </div>
        </div>);
    }

    return (
      <div style={parentContainerStyles}>
        <div style={subContainerStyles}>
          <div className="center-block text-center">
            <h2>WPM: 100</h2>
            <br></br>
            <h2>Filler words per 100: 10</h2>
            <br></br>
            <h2>Volume: Okay</h2>
          </div>

          <div className="center-block text-center">
            <img src={"https://image.flaticon.com/icons/svg/149/149046.svg"} width="100" className="center-block text-center" />
          </div>
          <div className="center-block text-center">
            <div style={container}>
              <Button variant={this.state.isRecording ? 'danger' : 'primary'} onClick={this.toggleRecord}>{this.state.isRecording ? 'Stop' : 'Start'}</Button>
              <div id='interim' style={interim}></div>
              <div id='final' style={final}></div>
            </div>

            <br></br>
            <br></br>
            <Button variant="warning" onClick={this.startAnalyze}>Analyze</Button>
          </div>

        </div>
      </div>
    );

  }

}

export default SpeechDismantler;

