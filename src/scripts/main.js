import { Dot, dotHead } from './modules/dot.js';  
import { importDots, exportDots } from './modules/file.js';  

//HTML Variable Definitions
const dotAddTextbox = document.getElementById("dot-add-textbox");
/*const dotAddButton = document.getElementById("dot-add-button");*/
const dotViewList = document.getElementById("dot-view-list");


/*
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
*/


//dotHead.toJSON();

//let dotHeadText = dotHead.toJSON();

/*
let dotArr = JSON.parse(dotHeadText);

dotArr.dots.forEach(_dot => {
    dotHead.addChild(new Dot(_dot.name, null, _dot.children))
})
*/
//console.log(dotHead);

//console.log(JSON.stringify(dotHead,null,2));

var dotFilePath = "../test/dots.json"

await importDots(dotFilePath);
await exportDots(dotFilePath);

//console.log(dotHead.fromJSON(dotHeadText));


//console.log(dotHead);
//console.log(JSON.stringify(dotHead));

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

