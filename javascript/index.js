



const print = (x) => console.log(x);



let frequency = (string) => {
    var freqDict = {}
    for (var i=0; i<string.length;i++) {
        var character = string.charAt(i);
        if (freqDict[character]) {
            freqDict[character]++;
        } else {
            freqDict[character] = 1;
        }
    }

    return freqDict;
}

let sortFrequency = (dict) => {
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });

    items.sort(function(first, second){
        return  first[1] - second[1];
    });
    return items;
}

function remove() {
    var graph = document.querySelector('svg');
    if (graph) { graph.parentElement.removeChild(graph) };

}

function clearFields(){
    remove();
    document.getElementById("decoderOutput").innerHTML = "";
    document.getElementById("DeCode").value = "";
    huffmanCoding.clearTable();
    fileInput.value = null;
    decoderInput.value = null;
    encodedText = "";
    decodedText = "";
    fileName = "";
}


