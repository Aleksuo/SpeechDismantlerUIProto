
import WordCounter from './wordFregs.js'
import AudioUtils from './AudioUtils.js'

class WordColor {

    constructor() {
        this.wordCounter = new WordCounter()
        this.AudioUtils = new AudioUtils()
        this.useWordCounter = false

    }

    DownsampleBuffer = (left, frequencies, volume) => {
        return this.AudioUtils.DownsampleBuffer(left, frequencies, volume)
    }

    CalculateFrequencies = (transcript) => {
        this.wordCounter.CalculateFrequencies(transcript)

    }

    GetColor = (word) => {
        if (this.useWordCounter) {
            return this.wordCounter.GetColor(word)

        } else {
            return this.AudioUtils.GetColor(word)
        }

    }

    ColorUsingWordFrequencies = () => {
        this.useWordCounter = true
    }

    ColorUsingVolumeLevel = () => {
        this.useWordCounter = false
    }

    SetVolumes = (newVolumes) => {
        this.AudioUtils.SetVolumes(newVolumes)
    }
}

export default WordColor