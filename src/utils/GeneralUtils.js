/**
 * Transforms milliseconds to string in mm:ss format
 * @param {number} milliseconds 
 * @author Aleksi Suoranta
 */
export const millisecondsToTimeString = (milliseconds) =>{
    const elapsedSec = Math.round(milliseconds/1000)
    const min = Math.floor(elapsedSec/60)
    const sec = Math.floor(elapsedSec-(min*60))
    const min_s = min<10 ? "0"+min.toString() : min.toString()
    const sec_s = sec<10 ? "0"+sec.toString() : sec.toString()
    return min_s+":"+sec_s
}

/**
 * Transfroms seconds to milliseconds
 * @param {number} seconds
 * @author Aleksi Suoranta
 */
export const secondsToMilliseconds = (seconds) => {
    return seconds*1000
}

/**
 * Transforms nanoseconds to milliseconds
 * @param {number} nanos 
 * @author Aleksi Suoranta
 */
export const nanosecondsToMilliseconds = (nanos) => {
    return nanos/1000000
}

/**
 * Estimates the start time of a sentence using the timestamps from the google api and a delay estimation epsilon
 * @param {object} sentence 
 * @param {number} epsilon 
 */
export const estimateStartTime = (sentence, epsilon) =>{
    const endTime = sentence.endTime
    const words = sentence.words
    const firstWord = words[0]
    const lastWord = words[words.length - 1]
    const firstTime = secondsToMilliseconds(firstWord.startTime.seconds) + nanosecondsToMilliseconds(firstWord.startTime.nanos)
    const lastTime = secondsToMilliseconds(parseInt(lastWord.endTime.seconds)) + nanosecondsToMilliseconds(lastWord.endTime.nanos)
    const duration = lastTime-firstTime + epsilon
    var end = endTime - duration
    end = end > 0 ? end : 0
    return end
}