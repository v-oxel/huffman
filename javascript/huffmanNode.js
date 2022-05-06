function Node(value,freq,right,left){
    this.value = value;
    this.freq = freq;
}



class HuffmanNode{
    constructor(){
        this.isOdd = false;
        this.data = 0;
        this.c = '';
        this.code = '';
        this.left = null;
        this.right = null;
    }
}

function HuffmanCoding(){
    this.string;
    this.sortedFrequency;
    //Stores the code for the characters (Dynamic Programming)
    this.codeDict;
    this.root;
    this.idCounter;
}
HuffmanCoding.prototype = {
    ini: function(string){
        this.string = string;
        this.sortedFrequency = sortFrequency(frequency(string));
        this.codeDict = {};
        this.root = this.createTree();
        this.idCounter = 0;
    },
    getRoot: function(){return this.root},
    createNode: function(list){
        var new_list = [];

        for(var key in list){
            if(list.hasOwnProperty(key)){
                if(key == " "){
                    new_list.push(new Node("Space" + ":" + list[key] ,list[key],null,null));
    
                }else if(key == "\n"){
                    new_list.push(new Node("Line" + ":" + list[key] ,list[key],null,null));
    
                    
                } else{
                    new_list.push(new Node(key + ": " + list[key] ,list[key],null,null));
                }
            }
        }
       
    
        return new_list.reverse();
    },
    createTree: function(){

        var charArray = [];
        var charFreq = [];

        this.sortedFrequency.forEach(x => charArray.push(x[0]));
        this.sortedFrequency.forEach(x => charFreq.push(x[1]));
       
        let n = charArray.length;
        let queue = [];



        for(var i = 0; i < n; i++){
            let huffNode = new HuffmanNode();
            huffNode.c = charArray[i];
            huffNode.data = charFreq[i];
            huffNode.left = null;
            huffNode.right = null;
            queue.push(huffNode);

        }

        var root = null;
        
        queue.sort(function(a,b){return a.data-b.data});
        if(queue.length > 0){
            root = queue[0];
        }
        
        while(queue.length>1){
            var x = queue[0];
            queue.shift();
            var y = queue[0];
            queue.shift();
            var f = new HuffmanNode();
            f.data = x.data + y.data;
            f.c = '-';
            f.left = x;
            f.right = y;
            root = f;
            
            queue.splice(0,0,f);
            queue.sort(function(a,b){return a.data-b.data});
        }
        return root;
    },
    printCode: function(root, s){
        if(root == null){
            return ;
        }
        if (root.left == null && root.right == null ){
            root.code += s;
            this.codeDict[root.c] = s;
            document.getElementById("TableCode").value +=root.c + ":" + s+"\n";
            return;
        }
        
        this.printCode(root.left,s+"1");
        this.printCode(root.right,s+"0");
        
        
        
    },
    printEncodedCode: function(root){
        var output = "";
        for(var i = 0; i < this.string.length; i++){
            output+=this.codeDict[this.string.substring(i,i+1)];
           
        }
        document.getElementById("Code").style.display="block";
        document.getElementById("Code").value = output;
        return output;
    },
    deCode: function(code,list){
        var output = "";
        if(code != ""){
            for(var i = 0; i < code.length;i++){
                for(var j = i; j <=code.length;j++){
                    for(key in list){
                    
                        if(code.substring(i,j)==list[key]){
                            output += key;
                            i = j;
                            break;
                        }
                    }
                }
                
                
            }
            
        }
        if(output != ""){
            return output;
        }
        
        
    },
    clearTable: function(){
        
        document.getElementById("table").style.display="none";
        document.getElementById("TableCode").value = "";
        document.getElementById("Code").value = "";
        document.getElementById("Code").style.display="none";
        
    },
    clearDecoder: function(){
        document.getElementById("decoderOutput").innerHTML = "";
    }
}

