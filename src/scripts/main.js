import { Dot, dotHead } from './modules/dot.js';  
import { fileMgr } from './modules/file.js';  
import { extMgr} from "./modules/extend.js";


//HTML Variable Definitions
const dotAddTextbox = document.getElementById("dot-add-textbox");

const dotViewList = document.getElementById("dot-view-list");

dotViewList.appendChild(dotHead.li);

var dotFilePath = "../test/dots.json"
await fileMgr.importDots(dotFilePath);
//await exportDots(dotFilePath);

//await extMgr.extensions[0].load();

await extMgr.getExtensions();

//let d1 = new Dot();
//let d2 = new Dot();

console.log(d1);

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