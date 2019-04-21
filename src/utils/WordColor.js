
import WordCounter from './WordFregs.js'
import AudioUtils from './AudioUtils.js'
import FillerWords from './FillerWords.js'

class WordColor {

    constructor() {
        this.WordCounter = new WordCounter()
        this.AudioUtils = new AudioUtils()
        this.FillerWords = new FillerWords()

        this.useFillerWords = false
        this.useWordFrequencies = true
        this.useVolumeLevel = false
    }

    CalculateFrequencies = (transcript) => {
        this.WordCounter.CalculateFrequencies(transcript)
    }

    GetColor = (word) => {
        if (this.useFillerWords) {
            return this.FillerWords.GetColor(word)
        } else if (this.useVolumeLevel){
            return this.AudioUtils.GetColor(word)
        } else {
            return this.WordCounter.GetColor(word)
        }
    }

    ColorUsingFillerWords = () => {
        this.useFillerWords = true
        this.useWordFrequencies = false
        this.useVolumeLevel = false
    }

    ColorUsingWordFrequencies = () => {
        this.useFillerWords = false
        this.useWordFrequencies = true
        this.useVolumeLevel = false
    }

    ColorUsingVolumeLevel = () => {
        this.useFillerWords = false
        this.useWordFrequencies = false
        this.useVolumeLevel = true
    }

    SetVolumes = (newVolumes) => {
        this.AudioUtils.SetVolumes(newVolumes)
    }
}

export default WordColor