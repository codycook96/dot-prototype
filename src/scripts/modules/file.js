import { Dot, dotHead } from './dot.js';  

//Modify this in the future to accomodate for reading non-local files
async function readFile(path){
    let data = "";

    return fetch(path)
        .then((res) => res.text())
        .then((text) => {
            return text;
        })
        .catch((e) => console.error(e));
}

async function writeFile(path, text){
    
}

//using global dotHead
async function importDots(path){
    let data = "";

    data = await readFile(path);
    
    let importJSON = JSON.parse(data);
    let dotArr = importJSON.dots;
    
    dotArr.forEach(_dot => {
        dotHead.addChild(new Dot(_dot.name, dotHead, _dot.children));
    });
}

//using global dotHead
async function exportDots(path){
    let text = "";
    let dottext = ""

    text += "{\n\t\"dots\": [";

    dotHead.children.forEach(child => {
        dottext += "\n";
        dottext += JSON.stringify(child, null, 2);
        if(dotHead.children.indexOf(child) !== dotHead.children.length - 1){
            dottext += ","
        }
    })
    //Add two tabs to every line to indent this section
    dottext = dottext.replace(/^/gm, "\t\t");

    text += dottext;
    text += "\n\t]\n}";

    console.log(text);

}

export { importDots, exportDots };

