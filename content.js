var nodedata = [];
var nodeparent = [];
var node1 = [];


var markup = document.getElementsByTagName("body");
markup[0].innerHTML = "<button id=\"btn2\" align=\"center\"  style=\"padding: 15px 32px\">Unhide spoiler </button><script src=\"http://jqueryjs.googlecode.com/files/jquery-1.3.2.js\" ></script>" + markup[0].innerHTML;

document.getElementById("btn2").addEventListener("click", function(){
	console.log("coming in");
	var elements = document.getElementsByClassName("taa")
	for(var key in elements)
		key.style.color = "black";
});



// function spoiler() {
function textNodesUnder(el){
 		var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
 		 while(n=walk.nextNode()) a.push(n);
		 return a;
		}


function tag() {
	var nodes = textNodesUnder(document)

	for (var i = 0; i < nodes.length; i++) {
		var text = nodes[i].nodeValue;
		
		var m = getEditDistance(text, txt);
		console.log("DEBUG:: Text is: " + text);
		console.log("DEBUG:: Edit Distance: " + m);
		console.log("DEBUG:: Spoiler text: " + txt);
		var div = $("<span class='taa' style='background-color:black'>"+ nodes[i].nodeValue + "</span>")
		if(m < (Math.max(text.length, txt.length) - Math.min(text.length, txt.length) + Math.cbrt(Math.min(text.length, txt.length)))){
			$(div).insertBefore($(nodes[i]))
			nodes[i].nodeValue =""
			// $(parent).contents().map(function() {
			// 	if (this.nodeType == Node.TEXT_NODE) {
			// 		this.nodeValue = "aaa"
			// 	}
			// });
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
var txt = '';
// const fileurl = chrome.runtime.getURL("plots.txt");
$.ajax({ type: "GET",   
         url: 	chrome.runtime.getURL("plots.txt"),   
         async: false,
         success : function(text)
         {
             txt = text;
         }
});
tag();