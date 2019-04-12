//colors from light to dark
const colors = ['#42e20d','#5be22f','#61e038','#68e041','#71e04c','#78e055','#80e060','#8ce070','#98e27f','#9ddd87']

class AudioUtils {

    constructor() {
        this.averageVolumes = []
        this.second=0
    }

    GetColor = (word) => {
        var startTime = word.startTime.seconds +(word.startTime.nanos/1000000000)
        var endTime = word.endTime.seconds + (word.endTime.nanos/1000000000)


        return 'black'
    }

    DownsampleBuffer = (buffer, sampleRate, outSampleRate) => {
        

        if (outSampleRate === sampleRate) {
            return buffer
        }
        /*
         if (outSampleRate > sampleRate) {
            throw 'downsampling rate show be smaller than original sample rate'
        }
        */
        const sampleRateRatio = sampleRate / outSampleRate
        const newLength = Math.round(buffer.length / sampleRateRatio)
        const result = new Int16Array(newLength)
        let offsetResult = 0
        let offsetBuffer = 0
        while (offsetResult < result.length) {
            const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio)
            let accum = 0; let
                count = 0
            for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
                accum += buffer[i]
                count++
            }

            result[offsetResult] = Math.min(1, accum / count) * 0x7FFF
            offsetResult++
            offsetBuffer = nextOffsetBuffer
        }

        return result.buffer
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
export default AudioUtils