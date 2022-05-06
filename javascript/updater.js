var huffmanCoding = new HuffmanCoding(),
timing;



var encoder = document.getElementById('encoderInput');
var decoder = document.getElementById('decoderInput');

var fileInput = document.getElementById("fileInput");
var decoderInput = document.getElementById('decoderFileInput');
var downloadEncBtn = document.getElementById("downloadEncBtn");
var downloadDecBtn = document.getElementById("downloadDecBtn");
var encodedText,decodedText,fileName;


function update(){
        if(encoder.value==""){
            clearFields();
        }else{
            
            huffmanCoding.ini(encoder.value);
            var root = huffmanCoding.getRoot();
            
            huffmanCoding.clearTable();
            document.getElementById("table").style.display="block";
            
    
            huffmanCoding.printCode(root,"0");
            var encodedOutput = huffmanCoding.printEncodedCode(root);
        
            var sortedFrequency = huffmanCoding.createNode(frequency(encoder.value));
            
            if(sortedFrequency != null){
                encodedText= encodedOutput+"\n";
                encodedText+= JSON.stringify(huffmanCoding.codeDict);
                decodedText = huffmanCoding.deCode(encodedOutput,huffmanCoding.codeDict);
            
            }
            
    
            remove();
            try{
                drawGraph(sortedFrequency);
            }catch(e){
                
            }
        }   
        
    
        
    
    
    
}





downloadEncBtn.addEventListener("click",
            function click(e){
                if(encoder.value == ""){
                    alert("Пустой файл");

                }else{
                    if(fileName == ""){
                        fileName = prompt("Введите название файла");
                    }
                    fileName += "_encoded.txt";
                        let a = document.createElement('a');
                        a.href = "data:application/octet-stream," + encodeURIComponent(encodedText);
                        a.download = fileName;
                        a.click();
                    
                }
                
            }

        );

downloadDecBtn.addEventListener("click",
            function input(e){
                if(decoder.value == ""){
                    alert("Пустой файл");

                }else{
                    if(fileName == ""){
                        fileName = prompt("Введите название файла");
                    }
                    fileName += "_decoded.txt";
                        let a = document.createElement('a');
                        a.href = "data:application/octet-stream," + encodeURIComponent(decodedText);
                        a.download = fileName;
                        a.click();
                    
                }
            }
);

fileInput.addEventListener('change',
    function input(e){
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
			let text = fileLoadedEvent.target.result;
            // document.getElementById("encoderInput").value = text;
            encoder.value=text;
            decoderInput.value = null;
            
            document.getElementById("decoderInput").value = "";
            update();
		}
        let nameSplit = e.target.files[0].name.split('.');
		var extension = nameSplit[nameSplit.length - 1].toLowerCase();
        var fname = e.target.files[0].name;
        
        fileName = fname.substring(0,fname.length-(extension.length+1));
       print(fileName);
		if (extension != "txt") {
			alert("Неправильный тип файла (." + extension + ") \nПоддерживаются только .txt файлы");
            fileInput.value = null;
			return;
		}else{
            fileReader.readAsText(e.target.files[0],"UTF-8");
        }	
        
        
    }
);

decoderInput.addEventListener('change',
    function input(e){
        
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {

			let text = fileLoadedEvent.target.result;
            // document.getElementById("encoderInput").value = text;
            var textSplit = text.split('\n');
            
            //print(JSON.parse(dict));

            document.getElementById("decoderOutput").innerHTML = "Расшифровка:<br>";
            document.getElementById("TableCode").style.display= "block";
            document.getElementById("DeCode").style.display= "block";
            document.getElementById("DeCode").value = huffmanCoding.deCode(textSplit[0],JSON.parse(textSplit[1]));
            decoder.value= textSplit[0];
            decodedText = huffmanCoding.deCode(textSplit[0],JSON.parse(textSplit[1]));
            encoder.value = decodedText;
            fileInput.value = null;
            update();
            
		}
        
        let nameSplit = e.target.files[0].name.split('.');
		var extension = nameSplit[nameSplit.length - 1].toLowerCase();

        var newSplit = e.target.files[0].name.split('_');
        var extension2 = newSplit[newSplit.length-1].toLowerCase();

        var fname = e.target.files[0].name;
        
        fileName = fname.substring(0,fname.length-(extension2.length+1));
        print(fileName);
		if (extension != "txt") {
			alert("Неправильный тип файла (." + extension + ") \nПоддерживаются только .txt файлы");
            decoderInput.value = null;
			return;
		}else{ 
            fileReader.readAsText(e.target.files[0],"UTF-8");
        }
        update();	
    }
);



encoder.addEventListener('input',
    function inputListener(e){
        document.getElementById("decoderInput").value = "";
        document.getElementById("DeCode").style.display = "none";
        document.getElementById("DeCode").value = "";
        huffmanCoding.clearDecoder();
        fileInput.value = null;
        decoderInput.value = null;
        update();
    }

);

decoder.addEventListener('input',
    function inputListener(e){
        if(encoder.value == "" || encoder.value == null){
            document.getElementById("decoderInput").value = "";
            alert("Словарь символов пуст!");
        }
        huffmanCoding.clearDecoder();
        decodedText = huffmanCoding.deCode(decoder.value,huffmanCoding.codeDict);
        if(decoder.value != '' && decodedText != null){
            decoder.value = e.target.value.replace(/[^01]/g, '');
            document.getElementById("decoderOutput").innerHTML = "Расшифровка:<br>";
            document.getElementById("DeCode").style.display = "block";
            document.getElementById("DeCode").value = decodedText;
        }else{
            document.getElementById("DeCode").style.display = "none";
            document.getElementById("DeCode").value = "";
        }
        
        
        
        // console.clear();
    }
);

