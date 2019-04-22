//colors from light to dark

const colors = ['#42e20d', '#5be22f', '#61e038', '#68e041', '#71e04c', '#78e055', '#80e060', '#8ce070', '#98e27f', '#9ddd87']

class AudioUtils {

    constructor() {
        this.averageVolumes = []
        this.timeInSeconds = 0
        this.wordTimesAndVolumes = new Map()

        const startTime = new Date()
        this.startTimeInSeconds = getTimeInSeconds(startTime)
        this.secondsSinceStart = 0
    }

    GetColor = (wordWithSentenceStartTime) => {
        var sentenceStartTime = (+wordWithSentenceStartTime.sentenceStartTime / 1000)

        var startTime = +wordWithSentenceStartTime.startTime.seconds + +sentenceStartTime
        var endTime = +wordWithSentenceStartTime.endTime.seconds + +sentenceStartTime
        var wordTime = (startTime + endTime) / 2

        //if matching time is not found, find best time match from "averageVolumes" and add corresponding
        //value to map, wordTime as key

        //here the later condition of if is to make sure some volume data exists
        if (!this.wordTimesAndVolumes.has(wordTime)) {
            if(this.secondsSinceStart>4){
            var bestVolumeMatch = GetBestMatchingVolume(wordTime, this.averageVolumes)

            //console.log('wordTime: '+wordTime+'seconds since start: '+ this.secondsSinceStart
            //+'best found match: '+ bestVolumeMatch)

            this.wordTimesAndVolumes.set(wordTime, bestVolumeMatch)
            }else{
                return 'black'
            }
        }
        
        //console.log('start time: ' + wordTime+ '  elapsed: ' + sentenceStartTime)

        //console.log('word time: ' + wordTime
        //    + 'volume match: ' + this.wordTimesAndVolumes.get(wordTime))

        //console.log(bestVolumeMatch)
        return convertVolumeToColor(this.wordTimesAndVolumes.get(wordTime))
    }

    SetVolumes = (newVolume) => {
        var timeAndVolume = []

        var currentTime = new Date()
        var currentTimeInSeconds = getTimeInSeconds(currentTime)
        var newSecondsSinceStart = +currentTimeInSeconds - +this.startTimeInSeconds

        if (newSecondsSinceStart - 0.02 > this.secondsSinceStart) {
            this.secondsSinceStart = newSecondsSinceStart

            timeAndVolume[0] = newSecondsSinceStart
            timeAndVolume[1] = newVolume.volume

            console.log(this.averageVolumes.length)
            //console.log('newTime: '+newSecondsSinceStart+'  volume: '+newVolume.volume)

            this.averageVolumes.push(timeAndVolume)
        }
    }
}

const getTimeInSeconds = (time) => {
    return (time.getHours() * 3600) + (time.getMinutes() * 60) + time.getSeconds() + (time.getMilliseconds() / 1000)
}

const convertVolumeToColor = (volume) => {
    if (volume < 10) {
        return 'blue'
    } else if (volume > 9 && volume < 60) {
        return 'green'
    } else if (volume > 59) {
        return 'red'
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