var nodedata = [];
var nodeparent = [];
var node1 = [];
var spoiler = "";


var markup = document.getElementsByTagName("body");
markup[0].innerHTML = "<button id=\"btn2\" align=\"center\"  style=\"padding: 15px 32px\">Unhide spoiler </button><script src=\"http://jqueryjs.googlecode.com/files/jquery-1.3.2.js\" ></script>" + markup[0].innerHTML;

document.getElementById("btn2").addEventListener("click", function(){
	console.log("coming in");
	for (var i = node1.length-1; i >=0; i--) {
		var newnode = document.createTextNode(nodedata[i]);
		nodeparent[i].replaceChild(newnode,node1[i]);
	}
});

function spoiler() {
	var elements = document.getElementsByTagName('*');

	for (var i = 0; i < elements.length; i++) 
	{

	    var element = elements[i];

	    for (var j = 0; j < element.childNodes.length; j++) 
	    {
	        var node = element.childNodes[j];

	        //nodetype 3 is read-only, and means text
	        if (node.nodeType === 3)
	         {
	            var text = node.nodeValue;
	            // if(getEditDistance("text"))
	            // {
	            // 	var p = "";
	            // 	var l  = text.length;
	            // 	for (var i = 0; i < text.length; i++) {
	            // 		p+="▒";
	            // 	}
	            // 	continue;
	            var replacedText = text.replace(/Trump/gi, '▒');
	            if (replacedText !== text) 
	            {    
	            	nodedata.push(text);
	            	nodeparent.push(element);
	            	var k = document.createTextNode(replacedText);
	                element.replaceChild(k, node);
	                node1.push(k);
	            }
	       	 }
	    }
	}
}
function getEditDistance(a, b){
	  if(a.length == 0) return b.length; 
	  if(b.length == 0) return a.length; 

	  var matrix = [];

	  // increment along the first column of each row
	  var i;
	  for(i = 0; i <= b.length; i++){
	    matrix[i] = [i];
	  }

	  // increment each column in the first row
	  var j;
	  for(j = 0; j <= a.length; j++){
	    matrix[0][j] = j;
	  }

	  // Fill in the rest of the matrix
	  for(i = 1; i <= b.length; i++){
	    for(j = 1; j <= a.length; j++){
	      if(b.charAt(i-1) == a.charAt(j-1)){
	        matrix[i][j] = matrix[i-1][j-1];
	      } else {
	        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
	                                Math.min(matrix[i][j-1] + 1, // insertion
	                                         matrix[i-1][j] + 1)); // deletion
	      }
	    }
	  }
	  return matrix[b.length][a.length];
};
var txt;
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
            }
        }
    }
    rawFile.send(null);
}
readTextFile("file:///home/anunay/Desktop/manifest/chrome-extension-blogpost-master/plots.txt");
// alert(txt);
// alert(txt);

spoiler();
// function textNodesUnder(el){
//   var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
//   while(n=walk.nextNode()) a.push(n);
//   return a;
// }

// var nodes = textNodesUnder(document)

// for (var i = 0; i < nodes.length; i++) {
//   nodes[i].nodeValue = "yummy"
// }