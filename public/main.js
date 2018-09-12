var height = 16;
var width = 16;
var onLoad = false;
var container;
let wikiInputOne;
let wikiInputTwo;
let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=';
let url;
let url2;
let response;
let searchResult1;
let searchResult2;
let searchResult1discription;
let searchResult2discription;
/// on page load do the next things:

$.ajax({
  url: "/GetGridSize",
  context: document.body
}).done(function(data) {

});

//on page load finish do the next things:

window.onload = function() {
  onLoad = true;
  // console.log("window_load");
  // goWiki();


};



function searchNoOne() {
  // wikiInputOne = document.getElementById("wikinumber01").value;
  // let term = wikiInputOne;
  // url = searchUrl + term;
  // // console.log("search01", url);
  // loadJSON1(url);
}

function myFunction() {
  wikiInputOne = document.getElementById("wikinumber01").value;
  let term = wikiInputOne;
  url = searchUrl + term;
  // console.log("search01", url);
  loadJSON1(url);
}

function searchNoTwo(){
  wikiInputTwo = document.getElementById("wikinumber02").value;
  let term = wikiInputTwo;
  url = searchUrl + term;
  // console.log("search01", url);
  loadJSON2(url);

}

function loadJSON1(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', url, true);
  xobj.onreadystatechange = function () {
    let thedata = xobj;
    let theSearch = JSON.parse(thedata.response);

    searchResult1 = theSearch[1][0];
    searchResult1discription = theSearch[2][0];

    // console.log(theSearch);
    refreshcontent();

  };
  xobj.send(null);
}


function loadJSON2(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', url, true);
  xobj.onreadystatechange = function () {
    let thedata = xobj;
    let theSearch = JSON.parse(thedata.response);

    searchResult2 = theSearch[1][0];
    searchResult2discription = theSearch[2][0];
    // console.log(theSearch);
    refreshcontent2();

  };
  xobj.send(null);
}


function refreshcontent(){

}


function refreshcontent2(){

  mixedContent();
}


function mixedContent(){


  document.getElementById("answerDiv").style.display = "block";

  //combine two topics
  let result = searchResult1.concat(searchResult2);
  let string = result.split("");
  string.sort(function(a, b){return 0.5 - Math.random()});;
  let combinedNameString = string.toString();
  combinedNameString = combinedNameString.replace(/#|,/g,'')
  let combinedNameStringLowercase = combinedNameString.toLowerCase();

  //remove first letter
  let combinedNameStringLowercaseWithout = combinedNameStringLowercase.substr(1);

  //get the first letter
  let firstLetter = combinedNameStringLowercase.charAt(0); // alerts 's'
  let firstLetterUpper = firstLetter.toUpperCase();
  console.log(firstLetterUpper);

  document.getElementById("mixedHeader").innerHTML = firstLetterUpper+combinedNameStringLowercaseWithout;


//mix two topics

  let def1 = searchResult1discription;
  let res1 = def1.split(" ");

  let def2 = searchResult2discription;
  let res2 = def2.split(" ");

  //combine two arrays
  let combinedArrays = res1.concat(res2);

  // console.log("uncut", combinedArrays, combinedArrays.length);
  // console.log("cut", combinedArrays.slice(30), combinedArrays.length );


  combinedArrays.sort(function(a, b){return 0.5 - Math.random()});
  let shortPar = combinedArrays;
  combinedArrays.length = 50;
  let combinedString = combinedArrays.toString();



  let combinedNoComma = combinedString;
  combinedNoComma = combinedNoComma.replace(/#|,/g,' ');
  let combinedlowercase = combinedNoComma.toLowerCase();

  document.getElementById("mixedAnswer").innerHTML= combinedlowercase + ".";
}
