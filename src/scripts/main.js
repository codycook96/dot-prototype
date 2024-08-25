import { Dot } from './modules/dot.js';  
import { dotHead } from './modules/dot.js'; 

//HTML Variable Definitions
const dotAddTextbox = document.getElementById("dot-add-textbox");
/*const dotAddButton = document.getElementById("dot-add-button");*/
const dotViewList = document.getElementById("dot-view-list");


  
var dot1 = new Dot("Dot1")
var dot2 = new Dot("Dot2");
var dot3 = new Dot("Dot3");
var dot1A = new Dot("Dot1A", dot1);
var dot1B = new Dot("Dot1B", dot1);
var dot1C = new Dot("Dot1C", dot1);
var dot1D = new Dot("Dot1D", dot1);
var dot1A1 = new Dot("Dot1A1", dot1A);
var dot1A2 = new Dot("Dot1A2", dot1A);
var dot1A3 = new Dot("Dot1A3", dot1A);
var dot1A2A = new Dot("Dot1A2A", dot1A2);
var dot1A2B = new Dot("Dot1A2B", dot1A2);

drawDots(dotHead, dotViewList)

function drawHead(list){
    dotHead.children.forEach(child => {
        drawDots(child, list);
    });
}

function drawDots(dot, list){
    list.innerHTML = "";
    dot.children.forEach(child => {
        let li = document.createElement("li");
        let ul = document.createElement("ul")
        li.innerHTML = "&#11044 " + child.name
        li.appendChild(ul);
        list.appendChild(li);
        drawDots(child, ul)
    });
}

/*
var el = document.getElementById("button-display");
if (el.addEventListener)
    el.addEventListener("click", displayDots, false);
else if (el.attachEvent)
    el.attachEvent('onclick', displayDots);

function displayDots(){
    dotReadView.value = dotHead.list("");  
}    

var el = document.getElementById("button-read");
if (el.addEventListener)
    el.addEventListener("click", readDots, false);
else if (el.attachEvent)
    el.attachEvent('onclick', readDots);

function readDots(){
    dot2.assignParent(dot3);
    drawDots(dotHead, dotViewList);
}  
*/



/*
let dots = ["test1", "test2"];

function addDot(){
    if(dotAddTextbox.value === ''){
        alert("You must enter some text!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = dotAddTextbox.value;
        dotViewList.appendChild(li);
        let mySpan = document.createElement("span");
        mySpan.innerHTML = "\u00d7";
        li.appendChild(mySpan);
    }
    dotAddTextbox.value = "";
}
*/