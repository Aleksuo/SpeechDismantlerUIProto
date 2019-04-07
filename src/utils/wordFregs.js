/* WordCounter counts frequensies of occurences of "word" -strings in transcript */

/*
new transcript
[
{"startTime":463,"endTime":2763,"words":[
    {"startTime":{"seconds":"0","nanos":0},"endTime":{"seconds":"2","nanos":0},"word":"Hello."},
    {"startTime":{"seconds":"2","nanos":0},"endTime":{"seconds":"2","nanos":0},"word":"Hello."},
    {"startTime":{"seconds":"2","nanos":0},"endTime":{"seconds":"2","nanos":300000000},"word":"Hello."}]
},
{"startTime":4351,"endTime":6951,"words":[
    {"startTime":{"seconds":"1","nanos":700000000},"endTime":{"seconds":"2","nanos":800000000},"word":"Good"},
    {"startTime":{"seconds":"2","nanos":800000000},"endTime":{"seconds":"3","nanos":300000000},"word":"morning."},
    {"startTime":{"seconds":"3","nanos":300000000},"endTime":{"seconds":"3","nanos":800000000},"word":"Hello."},
    {"startTime":{"seconds":"3","nanos":800000000},"endTime":{"seconds":"4","nanos":100000000},"word":"Good"},
    {"startTime":{"seconds":"4","nanos":100000000},"endTime":{"seconds":"4","nanos":300000000},"word":"morning."}]
}
]
*/

class WordCounter {

    constructor(){
        this.wordsAndFreqs = new Map()
    }

    GetFrequency = (word) => {
        //in case a word is not found a zero is returned
        var freq=0
        var wordNoPunctLoCase = RemovePunctuation(word).toLowerCase()

        if(this.wordsAndFreqs.has(wordNoPunctLoCase)){
            freq= this.wordsAndFreqs.get(wordNoPunctLoCase)
        }
        
        return freq
    }

    CalculateFrequencies = (transcript) => {
        //var st = JSON.stringify(transcript)
        //console.log('transcript: '+st)
        this.wordsAndFreqs = CountOccurences(transcript)

        function CountOccurences(tra) {
            var map = new Map()

            for (var j = 0; j < tra.length; j++) {
                var words = tra[j]['words']

                for (var i = 0; i < words.length; i++) {
                    var st = words[i]['word']
                    var stNoPunct = RemovePunctuation(st)
                    st = stNoPunct.toLowerCase()
                    //if map allready contains a certain key, the value is incremented
                    if (map.has(st)) {
                        var freg = map.get(st) + 1
                        map.set(st, freg)
                    } else {
                        map.set(st, 1)
                    }
                }
            }
            return map
        
        }

        /*
        //Returns an array of key value pairs
        function SortMap(map) {
            var iterator = map.keys()
            var entries = []
            var i

            for (i = 0; i < map.size; i++) {
                var key = iterator.next().value
                entries[i] = [key, map.get(key)]
            }

            function compare(a, b) {
                return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0
            }

            return entries.sort(compare)
        }
        */
    }

}

const RemovePunctuation=(string) =>{
    return string.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")
}

export default WordCounter
