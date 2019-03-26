export const millisecondsToTimeString = (milliseconds) =>{
    const elapsedSec = Math.round(milliseconds/1000)
    const min = Math.floor(elapsedSec/60)
    const sec = elapsedSec-(min*60)
    const min_s = min<10 ? "0"+min.toString() : min.toString()
    const sec_s = sec<10 ? "0"+sec.toString() : sec.toString()
    return min_s+":"+sec_s
}