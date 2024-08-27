import { loadNextScript } from "../loader.js";
import { fileMgr } from "./file.js";

var loadFlag_Extension = false;

class Extension{
    constructor(_name, _path, _version){
        this.name = _name;
        this.path = _path;
        this.version = _version;
        this.function = "";
        this.enabled = false;
        this.loaded = false;

        this.element = document.createElement('script');
        this.element.src = this.path;
        this.element.type = 'module';
        this.element.async = true;
        this.element.onload = () => {
            this.loaded = true;
            console.log("Extension " + this.name + " loaded.")
        };
        this.element.onunload = () => {
            this.loaded = false;
            console.log("Extension " + this.name + " unloaded.")
        }
        this.element.onerror = () => {console.log("Error loading extension " + this.name + ".")};
    }

    async load(){
        const scriptLoadPromise = new Promise(resolve => {
            document.body.appendChild(this.element);
            this.element.onload = resolve;
        });
    
        await scriptLoadPromise;
    }

    async unload(){
        document.body.removeChild(this.element);
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
            this.extensions.push(new Extension(_ext.name, _ext.path, _ext.version))
        });
    }

    async getExtensionFunc(){
        for (let i = 0; i < this.extensions.length; i++){
            let text = await fileMgr.readFile(this.extensions[i].path);
            this.extensions[i].function = new Function("return " + text)();
            this.functions.push(this.extensions[i].function);
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
console.log("end of extend.js");
loadNextScript();

export {Extension, ExtensionManager, extMgr};
