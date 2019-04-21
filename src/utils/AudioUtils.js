//colors from light to dark
const colors = ['#42e20d','#5be22f','#61e038','#68e041','#71e04c','#78e055','#80e060','#8ce070','#98e27f','#9ddd87']

class AudioUtils {

    constructor() {
        this.averageVolumes = []
        this.second = 0
        this.wordTimesAndVolumes = new Map()
    }

    GetColor = (word) => {
        var wordTime = (word.startTime.seconds +(word.startTime.nanos/1000000000)+word.endTime.seconds + (word.endTime.nanos/1000000000))/2

        //if matching time is not found, find best time match from "averageVolumes" and add corresponding
        //value to map, wordTime as key

        if(!this.wordTimesAndVolumes.has(wordTime)){
            var bestVolumeMatch = GetBestMatchingVolume(wordTime, this.averageVolumes)
            this.wordTimesAndVolumes.set(wordTime, bestVolumeMatch)
        }

        return convertVolumeToColor(this.wordTimesAndVolumes.get(wordTime))
    }

    SetVolumes = (newVolumes) => {
        var timeAndVolume = []

        var date = new Date()
        var currentTime = date
        currentTime.setHours(0)
        //setInterval(date, 1000)

        //console.log('Current time: '+ currentTime)
        //console.log('Date: '+date)

        var time = []
        time[0] = currentTime.getHours()
        time[1] = currentTime.getMinutes()
        time[2] = currentTime.getSeconds()
        time[3] = currentTime.getMilliseconds()

        var second = currentTime.getSeconds()

        if(second>this.second){
            this.second=second

            timeAndVolume[0] = time
            timeAndVolume[1] = newVolumes

            console.log(timeAndVolume)

            this.averageVolumes.push(timeAndVolume)
        }
    }

}

const convertVolumeToColor = (volume) => {
    return 'green'
}

const GetBestMatchingVolume = (number, array) => {
    var startIndex= 0
    var endIndex=array.length -1

    var closestMatch = findInSubArray(number, startIndex, endIndex)

    function findInSubArray(number, startIndex, endIndex){
        var middleIndex = (startIndex+endIndex)/2
        
        if(endIndex-startIndex<4 || middleIndex+1 === endIndex){
            return array[middleIndex]
        }

        if(number <= array[middleIndex]){
            return findInSubArray(number, startIndex,middleIndex)
        } else {
            return findInSubArray(number, middleIndex+1, endIndex)
        }
    }

    return closestMatch

}

export default AudioUtils