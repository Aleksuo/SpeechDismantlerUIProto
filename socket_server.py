from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types
from flask import Flask, render_template
from flask_socketio import SocketIO
import pprint
import os
import pdb
import queue


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './auth.json'

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

client = speech.SpeechClient()

responses = queue.Queue()

config = types.RecognitionConfig(
    encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=16000,
    language_code='en-US'
    )
streaming_config = types.StreamingRecognitionConfig(
        config=config,
        interim_results=True,)

@socketio.on('audio')
def connect(data):
    #pdb.set_trace()
    print(1)
    request = [types.StreamingRecognizeRequest(audio_content=data)]
    responses.put(client.streaming_recognize(streaming_config, request))     
    handle = responses.get_nowait()
    for response in handle:
        print(response)



if __name__ == '__main__':
    socketio.run(app)
        
