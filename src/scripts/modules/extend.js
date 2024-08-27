import { loadNextScript } from "../loader.js";
import { fileMgr } from "./file.js";

var loadFlag_Extension = false;

class Extension{
    constructor(_name, _path, _version, _author, _enabled){
        this.name = _name;
        this.path = _path;
        this.version = _version;
        this.author = _author;
        this.enabled = _enabled;
        this.function = "";
        this.loaded = false;
    }

}

class ExtensionManager{
    extensions;
    pathExtensions;
    functions;
    constructor(){
        this.extensions = [];
        this.functions = [];
        this.pathExtensions = "/src/scripts/extensions/extensions.json"
    }

    async getExtensionConfig(){
        let data = "";
    
        data = await fileMgr.readFile(this.pathExtensions);
        let importJSON = JSON.parse(data);
        let extArr = importJSON.extensions;
        extArr.forEach(_ext => {
            this.extensions.push(new Extension(_ext.name, _ext.path, _ext.version, _ext.author, _ext.enabled))
        });
    }

    async getExtensionFunc(){
        for (let i = 0; i < this.extensions.length; i++){
            if(this.extensions[i].enabled){
                let text = await fileMgr.readFile(this.extensions[i].path);
                this.extensions[i].function = new Function("return " + text)();
                this.functions.push(this.extensions[i].function);
                this.extensions[i].loaded = true;
            }
            else{
                this.extensions[i].loaded = false;
            }
        };

    }

    async getExtensions(){
        await this.getExtensionConfig().then(() => 
            this.getExtensionFunc());
    }


}

var extMgr = new ExtensionManager(); 

await extMgr.getExtensions();

loadFlag_Extension = true;

loadNextScript();

export {Extension, ExtensionManager, extMgr};
