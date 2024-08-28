import { Dot, dotHead } from './dot.js';  
import { fileMgr } from './file.js';  
import { extMgr} from "./extend.js";

export function main(){
    const dotList = document.getElementById("dot-list");

    dotHead.children.forEach(ch => {
        dotList.appendChild(ch.li);
    });
    
    var dotButtonAdd = document.getElementById("dot-button-add");
    var dotTextboxAdd = document.getElementById("dot-textbox-add");

    //dotButtonAdd.onclick = dothing1;
    dotButtonAdd.addEventListener("click", function(){
        console.log("click")
        let nD = new Dot(dotHead.children[0]);
        nD.name = "test"; //dotTextboxAdd.value;
 

        dotTextboxAdd.value = "";
        //dotHead.addChild(new Dot(dotHead));
        console.log(nD);
    });

}

main();







/*

//HTML Variable Definitions
const dotAddTextbox = document.getElementById("dot-add-textbox");

const dotView = document.getElementById("dot-view");

//dotViewList.appendChild(dotHead.li);
var dotFilePath = "../test/dots.json"
//await extMgr.getExtensions();
//await fileMgr.importDots(dotFilePath);

console.log(dotHead)

dotView.appendChild(dotHead.ul);


//await exportDots(dotFilePath);

//await extMgr.extensions[0].load();


*/
//let d1 = new Dot();
//let d2 = new Dot();


/*
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
    */