import React, { Component } from 'react';
import { Button, Dropdown, Navbar } from 'react-bootstrap';
import { VictoryBar, VictoryTheme, VictoryChart, VictoryPie } from 'victory';
import openSocket from 'socket.io-client';

let bufferSize = 2048,
  AudioContext,
  context,
  processor,
  input,
  globalStream,
  streamStreaming = false;
//const socket = new WebSocket("ws://localhost:8000");
const socket = openSocket('http://localhost:3001');









class SpeechDismantler extends Component {

  constructor(props) {
    super(props);
    this.bufferSize = 4096;
    this.socket = openSocket('http://localhost:3001');
    this.state = {
      isRecording: false,
      isAnalyzing: false
    }

    this.socket.on('connect', (data) => {
      this.socket.emit('join', 'Server Connected to Client');
    });
    
    this.socket.on('messages', (data) => {
      console.log(data);
    });

    this.socket.on('speechData', (data) => {
      console.log(data.results[0].alternatives[0].transcript);
    })

    window.onbeforeunload = () =>{
      if (streamStreaming) { this.socket.emit('endGoogleCloudStream', ''); }
    };
    
  }


  toggleRecord = () => {
    console.log("p")
    this.setState({
      isRecording: !this.state.isRecording
    }, this.handleListen);
  }

  startAnalyze = () => {
    this.setState(state => ({
      isAnalyzing: !state.isAnalyzing
    }));
  }

  streamAudioData = (e) => {
    //debugger
    var left = e.inputBuffer.getChannelData(0);
    // var left16 = convertFloat32ToInt16(left); // old 32 to 16 function
    var left16 = this.downsampleBuffer(left, 44100, 16000)
    this.socket.emit('binaryData', left16);
  }

  handleListen = () => {
    this.socket.emit('startGoogleCloudStream', ''); //init socket Google Speech Connection
    streamStreaming = true;
    AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    processor = context.createScriptProcessor(bufferSize, 1, 1);
    processor.connect(context.destination);
    context.resume();

    const handleSuccess = (stream) => {
      console.log(this)
      globalStream = stream;
      input = context.createMediaStreamSource(stream);
      input.connect(processor);
      processor.onaudioprocess = (e) => {
        this.streamAudioData(e)
      };
      console.log("init done")
    }

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess)
  }

  stopRecording = () => {
    // waited for FinalWord
    /*
    startButton.disabled = false;
    endButton.disabled = true;
    recordingStatus.style.visibility = "hidden";
    */
    streamStreaming = false;
    this.socket.emit('endGoogleCloudStream', '');


    let track = globalStream.getTracks()[0];
    track.stop();

    input.disconnect(processor);
    processor.disconnect(context.destination);
    context.close().then(function () {
      input = null;
      processor = null;
      context = null;
      AudioContext = null;
    })
  }

  /*
  convertFloat32ToInt16 = (buffer) =>{
    let l = buffer.length;
    let buf = new Int16Array(l / 3);
  
    while (l--) {
      if (l % 3 == 0) {
        buf[l / 3] = buffer[l] * 0xFFFF;
      }
    }
    return buf.buffer
  }
  */

  downsampleBuffer = (buffer, sampleRate, outSampleRate) => {
    if (outSampleRate == sampleRate) {
        return buffer;
    }
    if (outSampleRate > sampleRate) {
        throw "downsampling rate show be smaller than original sample rate";
    }
    var sampleRateRatio = sampleRate / outSampleRate;
    var newLength = Math.round(buffer.length / sampleRateRatio);
    var result = new Int16Array(newLength);
    var offsetResult = 0;
    var offsetBuffer = 0;
    while (offsetResult < result.length) {
        var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
        var accum = 0, count = 0;
        for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
            accum += buffer[i];
            count++;
        }

        result[offsetResult] = Math.min(1, accum / count)*0x7FFF;
        offsetResult++;
        offsetBuffer = nextOffsetBuffer;
    }
    return result.buffer;
}








  render (){




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

