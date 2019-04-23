
const fillerWordsJson = require('./../config/fillerWords.json')

//colors from light to dark
const colors = ['#42e20d', '#5be22f', '#61e038', '#68e041', '#71e04c', '#78e055', '#80e060', '#8ce070', '#98e27f', '#9ddd87']

class FillerWords {

    constructor() {
        this.fillerWords = new Map()

        const fillers = fillerWordsJson.fillerWords
        for (var i = 0; i < fillers.length; i++) {
            this.fillerWords.set(fillers[i].fillerWord, 1)
        }
    }

    GetColor = (wordInformation) => {
        var word = RemovePunctToLowerCase(wordInformation.word)

        if (this.fillerWords.has(word)) {
            return 'red'
        } else {
            return 'black'
        }

    }
}

const RemovePunctToLowerCase = (string) => {
    return RemovePunctuation(string).toLowerCase()
}

const RemovePunctuation = (string) => {
    return string.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")
}

export default FillerWords
