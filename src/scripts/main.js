import { debug } from "./modules/debug/debug.js";
import { AppManager } from "./modules/app_manager.js";
import { Dot } from "./modules/dot/dot.js";
import { dotHead } from "./modules/dot/dot_head.js";

export var extensions = [];

async function main(){
    const dotList = document.getElementById("dot-list");

    var appManager = new AppManager({
        path: "/src/test/dots.json",
        ul: dotList
    })
    //debug.log("This is a test");

    //var d1 = new Dot({name: "d1"})

    debug.obj(appManager);

    debug.log("Log this message at main line 17");

    await appManager.loadFile();
    
    debug.obj(appManager, "First call after load file.")

    const btn_ext = document.getElementById("dot-button-ext");
    debug.obj(btn_ext);
    btn_ext.addEventListener("click", (event) => {
        appManager.loadExtensions();
        
    });



    var btn_dot = document.getElementById("dot-button-dot");
    btn_dot.addEventListener("click", (event) => {
        appManager.loadDots();
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