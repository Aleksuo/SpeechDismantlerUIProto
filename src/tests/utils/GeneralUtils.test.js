/* eslint-disable */
import { millisecondsToTimeString, estimateStartTime, secondsToMilliseconds, nanosecondsToMilliseconds } from '../../utils/GeneralUtils'

describe("millisecondsToTimeString", () => {
    it('Converts milliseconds to a readable string', () => {
        expect(millisecondsToTimeString(0)).toEqual("00:00")
    })

    it('Seconds are displayed correctly', () => {
        expect(millisecondsToTimeString(0)).toEqual("00:00")
        expect(millisecondsToTimeString(1000)).toEqual("00:01")
        expect(millisecondsToTimeString(10000)).toEqual("00:10")
        expect(millisecondsToTimeString(61000)).toEqual("01:01")
    })

    it('Minutes are displayed correctly', () => {
        expect(millisecondsToTimeString(60000)).toEqual("01:00")
        expect(millisecondsToTimeString(600000)).toEqual("10:00")
        expect(millisecondsToTimeString(660000)).toEqual("11:00")
    })
})

describe("secondsToMilliseconds", () =>{
    it('Converts seconds to milliseconds correctly', () => {
        expect(secondsToMilliseconds(0)).toEqual(0)
        expect(secondsToMilliseconds(50)).toEqual(50000)
    })
})

describe("nanosecondsToMilliseconds", () => {
    it('Converts nanoseconds to milliseconds correctly', () => {
        expect(nanosecondsToMilliseconds(0)).toEqual(0)
        expect(nanosecondsToMilliseconds(1000000)).toEqual(1)
        expect(nanosecondsToMilliseconds(100000000)).toEqual(100)
    })
})

describe("estimateStartTime", () => {
    const oneWordSentence = {
        endTime: 2000,
        words: [
            {
                startTime: { seconds: "1", nanos: 0 },
                endTime: { seconds: "1", nanos: 600000000 }
            }
        ]
    }

    const MultipleWordSentence = {
        endTime: 3000,
        words: [
            {
                startTime: { seconds: "1", nanos: 0 },
                endTime: { seconds: "1", nanos: 600000000 }
            },
            {
                startTime: { seconds: "2", nanos: 0 },
                endTime: {seconds: "2", nanos: 100000000}
            }

        ]
    }

    it('Returns correct estimate for one word sentence', () => {
        expect(estimateStartTime(oneWordSentence, 0)).toEqual(1400)
    })

    it('Returns correct estimate for multiple word sentence', () =>{
        expect(estimateStartTime(MultipleWordSentence, 0)).toEqual(1900)
    })
})
