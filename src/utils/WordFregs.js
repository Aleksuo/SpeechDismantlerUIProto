/* WordCounter counts frequensies of occurences of "word" -strings in transcript */

//colors from light to dark
const colors = ['#42e20d', '#5be22f', '#61e038', '#68e041', '#71e04c', '#78e055', '#80e060', '#8ce070', '#98e27f', '#9ddd87']

class WordCounter {

    constructor() {
        this.wordsAndFreqs = new Map()
        this.topWords = []
    }

    GetColor = (wordInformation) => {
        var word = wordInformation.word
        var index = GetIndexInTopWords(word, this.topWords)

        if (index === -1) {
            return 'black'
        } else {
            //if first in list has lover frequency than 2, all words are colored black
            if (this.topWords[index][1] < 3) {
                return 'black'
            } else {
                return colors[index]
            }
        }
    }

    IsInMostUsedList = (word) => {
        if (GetIndexInTopWords(word, this.topWords) > -1) {
            return true
        }
        return false
    }

    GetFrequency = (word) => {
        //in case a word is not found a zero is returned
        var freq = 0
        var wordMapForm = RemovePunctToLowerCase(word)

        if (CheckIfInMap(wordMapForm, this.wordsAndFreqs)) {
            freq = this.wordsAndFreqs.get(wordMapForm)
        }

        return freq
    }

    CalculateFrequencies = (transcript) => {
        var numberOfTopWords = 10

        this.wordsAndFreqs = CountOccurences(transcript)
        this.topWords = SortMap(this.wordsAndFreqs)
        this.topWords = LimitToXGreatest(this.topWords, numberOfTopWords)

        function LimitToXGreatest(array, newArrSize) {

            if (newArrSize < array.length) {
                var newFirstIndex = array.length - newArrSize
                var lastElements = array.slice(newFirstIndex)

                return lastElements.reverse()
            } else {
                return array.reverse()
            }
        }

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
    }

}

const RemovePunctuation = (string) => {
    return string.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")
}

const RemovePunctToLowerCase = (string) => {
    return RemovePunctuation(string).toLowerCase()
}

const CheckIfInMap = (string, map) => {
    var stringNoPunctLoCase = RemovePunctToLowerCase(string)

    if (map.has(stringNoPunctLoCase)) {
        return true
    }
    return false
}

const GetIndexInTopWords = (string, array) => {
    //returns integer telling strings index in top words, if not found returns -1
    var stringListForm = RemovePunctToLowerCase(string)

    if (array === undefined || array.length == 0) {
        return -1
    }

    for (var i = 0; i < array.length; i++) {
        if (stringListForm === array[i][0]) {
            return i
        }
    }

    return -1
}

export default WordCounter
