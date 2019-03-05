import React, { Component } from 'react';
import { Button, Dropdown, Navbar } from 'react-bootstrap';
import { VictoryBar, VictoryTheme, VictoryChart, VictoryPie } from 'victory';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

class SpeechDismantler extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      isAnalyzing: false
    };

    this.toggleRecord = this.toggleRecord.bind(this)
    this.startAnalyze = this.startAnalyze.bind(this)
    this.handleListen = this.handleListen.bind(this)
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

  handleListen() {

   

    if (this.state.isRecording) {
      recognition.start()
      recognition.onend = () => {
        console.log("...continue listening...")
        recognition.start()
      }

    } else {
      recognition.stop()
      recognition.onend = () => {
        console.log("Stopped listening per click")
      }
    }

    recognition.onstart = () => {
      console.log("Listening!")
    }

    let finalTranscript = ''
    recognition.onresult = event => {
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else interimTranscript += transcript;
      }
      document.getElementById('interim').innerHTML = interimTranscript
      document.getElementById('final').innerHTML = finalTranscript

      //-------------------------COMMANDS------------------------------------

      const transcriptArr = finalTranscript.split(' ')
      const stopCmd = transcriptArr.slice(-3, -1)
      console.log('stopCmd', stopCmd)

      if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') {
        recognition.stop()
        recognition.onend = () => {
          console.log('Stopped listening per command')
          const finalText = transcriptArr.slice(0, -3).join(' ')
          document.getElementById('final').innerHTML = finalText
        }
      }
    }

    //-----------------------------------------------------------------------

    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error)
    }

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
      const final =  {
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

