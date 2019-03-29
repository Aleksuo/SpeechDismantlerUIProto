export const millisecondsToTimeString = (milliseconds) =>{
    const elapsedSec = Math.round(milliseconds/1000)
    const min = Math.floor(elapsedSec/60)
    const sec = elapsedSec-(min*60)
    const min_s = min<10 ? "0"+min.toString() : min.toString()
    const sec_s = sec<10 ? "0"+sec.toString() : sec.toString()
    return min_s+":"+sec_s
}


export const secondsToMilliseconds = (seconds) => {
    return seconds*1000
}
export const nanosecondsToMilliseconds = (nanos) => {
    return nanos/1000000
}

export const estimateStartTime = (sentence) =>{
    const endTime = sentence.endTime
    const words = sentence.words
    const firstWord = words[0]
    const lastWord = words[words.length - 1]
    const firstTime = secondsToMilliseconds(firstWord.startTime.seconds) + nanosecondsToMilliseconds(firstWord.startTime.nanos)
    const lastTime = secondsToMilliseconds(parseInt(lastWord.endTime.seconds)) + nanosecondsToMilliseconds(lastWord.endTime.nanos)
    const duration = lastTime-firstTime
    return endTime-duration
}