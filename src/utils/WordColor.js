
import WordCounter from './wordFregs.js'
import AudioUtils from './AudioUtils.js'

class WordColor {

    constructor() {
        this.wordCounter = new WordCounter()
        this.AudioUtils=new AudioUtils()

    }

    downsampleBuffer(left, frequencies, volume){
        this.AudioUtils.downsampleBuffer(left,frequencies,volume)
    }

    CalculateFrequencies = (transcript) =>{
        this.wordCounter.CalculateFrequencies(transcript)

    }

    GetColor = (word) => {
        this.wordCounter.GetColor(word)
    }

    
}

export default WordColor