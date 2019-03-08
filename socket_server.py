from aiohttp import web
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types
import socketio

sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)

client = speech.SpeechClient()

config = types.RecognitionConfig(
    encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=16000,
    language_code='en-US')
streaming_config = types.StreamingRecognitionConfig(
        config=config,
        interim_results=True)
requests = []
response = client.streaming_recognize(streaming_config, requests)
print(response)


@sio.on('audio')
async def connect(sid, data):
    request = types.StreamingRecognizeRequest(audio_content=data)
    response = client.streaming_recognize(streaming_config, request)
    print(response)
    await sio.emit('analysis', response)


if __name__ == '__main__':
    web.run_app(app)
        
