
export const DownsampleBuffer = (buffer, sampleRate, outSampleRate) => {

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