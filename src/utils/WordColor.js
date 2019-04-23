
import WordCounter from './WordFregs.js'
import AudioUtils from './AudioUtils.js'
import FillerWords from './FillerWords.js'

class WordColor {

    constructor() {
        this.WordCounter = new WordCounter()
        this.AudioUtils = new AudioUtils()
        this.FillerWords = new FillerWords()

        this.useFillerWords = false
        this.useWordFrequencies = false
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
        } else if (this.useWordFrequencies) {
            return this.WordCounter.GetColor(word)
        } else {
            return 'black'
        }
    }

    ColorUsingFillerWords = () => {
        this.useFillerWords = true
        this.useWordFrequencies = false
        this.useVolumeLevel = false

        console.log('fillers: '+this.useFillerWords+' freq: '+this.useWordFrequencies+' volume: '+this.useVolumeLevel)
    }

    ColorUsingWordFrequencies = () => {
        this.useFillerWords = false
        this.useWordFrequencies = true
        this.useVolumeLevel = false

        console.log('fillers: '+this.useFillerWords+' freq: '+this.useWordFrequencies+' volume: '+this.useVolumeLevel)

    }

    ColorUsingVolumeLevel = () => {
        this.useFillerWords = false
        this.useWordFrequencies = false
        this.useVolumeLevel = true

        console.log('fillers: '+this.useFillerWords+' freq: '+this.useWordFrequencies+' volume: '+this.useVolumeLevel)

    }

    ResetColor = () => {
        this.useFillerWords = false
        this.useWordFrequencies = false
        this.useVolumeLevel = false

        console.log('fillers: '+this.useFillerWords+' freq: '+this.useWordFrequencies+' volume: '+this.useVolumeLevel)

    }

    SetVolumes = (newVolumes) => {
        this.AudioUtils.SetVolumes(newVolumes)
    }
}

export default WordColor