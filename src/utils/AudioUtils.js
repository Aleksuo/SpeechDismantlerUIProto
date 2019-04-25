class AudioUtils {

    constructor() {
        this.averageVolumes = []
        this.wordTimesAndVolumes = new Map()

        this.startTime = 0
        this.startTimeNotSet = true
        this.startVolume = 0
        this.volumeCounter = 0

        this.audioSampleSize = 10 // how many audio samples to average for each recorded time
    }

    GetColor = (wordWithSentenceStartTime) => {
        var sentenceStartTimeMs = (+wordWithSentenceStartTime.sentenceStartTime)

        var startTimeMs = (+wordWithSentenceStartTime.startTime.seconds * 1000) + +sentenceStartTimeMs
        var endTimeMs = (+wordWithSentenceStartTime.endTime.seconds * 1000) + +sentenceStartTimeMs
        var wordTime = (startTimeMs + endTimeMs) / 2

        //if matching time is not found, find best time match from "averageVolumes" and add corresponding
        //value to map, wordTime as key
        if (!this.wordTimesAndVolumes.has(wordTime)) {
            var bestVolumeMatch = GetBestMatchingVolume(wordTime, this.averageVolumes)
            this.wordTimesAndVolumes.set(wordTime, bestVolumeMatch)
        }
        //console.log('time: ' + wordTime + '  volume: ' + this.wordTimesAndVolumes.get(wordTime))
        return convertVolumeToColor(this.wordTimesAndVolumes.get(wordTime))
    }

    SetVolumes = (newVolume) => {
        var timeAndVolume = []
        this.startVolume = this.startVolume + +newVolume.volume
        this.volumeCounter = +this.volumeCounter + 1
        if (this.startTimeNotSet) {
            this.startTime = newVolume.time
            this.startTimeNotSet = false
        }

        if (this.volumeCounter === this.audioSampleSize) {

            timeAndVolume[0] = ((this.startTime + +newVolume.time) / 2)
            timeAndVolume[1] = (+this.startVolume / this.audioSampleSize)

            this.averageVolumes.push(timeAndVolume)
            //console.log('av time: ' +timeAndVolume[0]+'  av volume: '+timeAndVolume[1])

            this.startVolume = 0
            this.volumeCounter = 0
            this.startTime = 0

            this.startTimeNotSet = true
        }
    }
}

const convertVolumeToColor = (volume) => {
    if (volume < 25) {
        return 'blue'
    } else if (volume > 24) {
        return 'green'
    } else {
        return 'black'
    }
}

const GetBestMatchingVolume = (number, arr) => {
    var startIndex = 0
    var array = []
    array = arr
    var endIndex = array.length - 1

    var closestMatch = findInSubArray(number, startIndex, endIndex)

    function findInSubArray(number, startIndex, endIndex) {
        var middleIndex = parseInt((startIndex + endIndex) / 2, 10)

        if (endIndex - startIndex < 4 || middleIndex + 1 === endIndex) {
            return array[middleIndex][1]
        }

        if (number <= array[middleIndex][0]) {
            return findInSubArray(number, startIndex, middleIndex)
        } else {
            return findInSubArray(number, middleIndex + 1, endIndex)
        }
    }
    return closestMatch
}

export default AudioUtils