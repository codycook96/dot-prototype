import { debug } from "../debug/debug.js";
import { dotHead } from "./dot_head.js";
import { FileManager } from "../file/file_manager.js";

class DotManager{
    path;
    #fileManager;
    #dotClass;
    constructor(params = {}){
            //Assign defaults for destructured parameters
        let modParams = Object.assign({
            path: "",
            extensions: [],
            fileManager: new FileManager()
        }, params);

        this.path = modParams.path;
        this.#fileManager = modParams.fileManager;
        this.#dotClass = null;
        
        debug.con(this);
    }

    async updateDotClass(){
        //We want the class to be reimported every time the function is called
        //So we create a unique path for it by adding a useless query that
        //Changes with current time in ms
        let path = "./dot.js" + "?version=" + Date.now();
        this.#dotClass = await import(path);
    }

    async importDots(){    
        await this.updateDotClass();

        let text = await this.#fileManager.readFile(this.path);
    
        let importJSON = JSON.parse(text);

        let importDots = {}
        importDots.children = importJSON.dots;

        this.createChildDots(dotHead, importDots);
    }
    
    createChildDots(_dot, _obj){
        _obj.children.forEach( ocd => {
            let props = {}
            for(var prop in ocd){
                if(prop !== "children" && prop !== "parent"){
                    props[prop] =  ocd[prop];
                }
            }
            
            let newDot = new this.#dotClass.Dot(props);

            newDot.assignParent(_dot);

            if(ocd.children.length > 0){
                this.createChildDots(newDot, ocd);
            }
        })
        
    }

    async exportDots(){
        let text = "";
        let dottext = ""
    
        text += "{\n\t\"dots\": [";
    
        dotHead.children.forEach(child => {
            dottext += "\n";
            dottext += JSON.stringify(child, null, 2);
            if(this.dotHead.children.indexOf(child) !== this.dotHead.children.length - 1){
                dottext += ","
            }
        })
        //Add two tabs to every line to indent this section
        dottext = dottext.replace(/^/gm, "\t\t");
    
        text += dottext;
        text += "\n\t]\n}";
    
        //REPLACE ME
        //TODO
        //Add file output / download
        console.log(text);
    }
}

export {DotManager};