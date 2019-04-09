
class AudioUtils {

    constructor() {
        this.averageVolumes = []
        this.second=0
    }

    downsampleBuffer = (buffer, sampleRate, outSampleRate) => {
        

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
            timeAndVolume[1] = result.buffer
            console.log(timeAndVolume)

        }

        return result.buffer
    }

}
export default AudioUtils