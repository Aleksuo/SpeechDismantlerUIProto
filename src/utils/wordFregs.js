 /* WordCounter counts frequensies of occurences of "word" -strings in transcript

    Example of expected format of input "transcript":
    const transcript=[
        {"startTime":{"seconds":"1","nanos":200000000},"endTime":{"seconds":"1","nanos":700000000},"word":"cat"},
        {"startTime":{"seconds":"1","nanos":600000000},"endTime":{"seconds":"2","nanos":400000000},"word":"horse"},
        {"startTime":{"seconds":"1","nanos":300000000},"endTime":{"seconds":"1","nanos":700000000},"word":"cat"}
    ];
*/

export const WordCounter = (transcript) => {
    const maxSizeOfOutput=10
    var wordFregs = CountOccurences(transcript)
    var dataEntries = SortMap(wordFregs)
    var data = CreateDataPoints(dataEntries,maxSizeOfOutput)

    function CountOccurences(tra){
        var map= new Map()

        //var i
        for(var j = 0; j < tra.length; j++){
            var sentence = tra[j]
            for(var i=0; i < sentence.words.length;i++){
                var wordObject = sentence.words[i]
                var stNoPunct = RemovePunctuation(wordObject['word'])
                var st= stNoPunct.toLowerCase()
                //if map allready contains a certain key, the value is incremented
                if(map.has(st)){
                    var freg = map.get(st) + 1
                    map.set(st,freg)
                } else {
                    map.set(st,1)
                }
            }

        }
        
        return map
    }

    function RemovePunctuation(string){
        return string.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")
    }

    function CreateDataPoints(array,size){
        array.reverse()
        var data = []
        var len= array.length
        if(len>size){
            len=size
        }

        var i
        for(i=0;i<len;i++){
            var dataPoint = new Object()
            dataPoint.x = array[i][0]
            dataPoint.y = array[i][1]
            data[i]= dataPoint
        }
        return data
    }

    function SortMap(map){
        var iterator= map.keys()
        var entries=[]
        var i

        for(i=0; i<map.size; i++){
            var key=iterator.next().value             
            entries[i]=[key,map.get(key)]
        }

        function compare(a,b) {
            return a[1]>b[1]? 1:a[1]<b[1]?-1:0
        }

        return entries.sort(compare)
    }
    
    return data
}
