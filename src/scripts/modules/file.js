import { Dot, dotHead } from './dot.js';  
import { Extension, extMgr} from "./extend.js";

class fileManager{
    constructor(){

    }

    async readFile(path){
        let data = "";
    
        return fetch(path)
            .then((res) => res.text())
            .then((text) => {
                return text;
            })
            .catch((e) => console.error(e));
    }

    async writeFile(path, text){
    
    }

    //using global dotHead
    async importDots(path){
        let data = "";

        data = await this.readFile(path);
        
        let importJSON = JSON.parse(data);
        let dotArr = importJSON.dots;
        
        dotArr.forEach(_dot => {
            dotHead.addChild(new Dot(_dot.name, dotHead, _dot.children));
        });  
    }

    //using global dotHead
    async exportDots(path){
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

        //REPLACE ME
        console.log(text);
    }

    async importExtensionList(path){
        let data = "";

        data = await this.readFile(path);
        let importJSON = JSON.parse(data);
        let extArr = importJSON.extensions;
        extArr.forEach(_ext => {
            extMgr.extensions.push(new Extension(_ext.name, _ext.path, _ext.version))
        });
    }
}

const fileMgr = new fileManager();

export { fileMgr };

