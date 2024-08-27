import { fileMgr } from "./file.js";
import { dotExtFuncs } from "./dot.js";

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
    extCfgPath;
    funcList;
    constructor(){
        this.extensions = [];
        this.funcList = [];
        this.extCfgPath = "/src/scripts/extensions/extensions.json"
    }

    async getExtensionConfig(){
        await fileMgr.importExtensionList(this.extCfgPath);
    }

    async getExtensionFunc(){
        for (let i = 0; i < this.extensions.length; i++){
            let text = await fileMgr.readFile(this.extensions[i].path);
            this.extensions[i].function = new Function("return " + text)();
            localStorage.setItem("dotExtFuncs[" + i + "]", this.extensions[i].function)
            dotExtFuncs.push(this.extensions[i].function);
            
        };
        console.log(dotExtFuncs);
    }

    async loadExtensionFunc(){
        /*for (let i = 0; i < this.extensions.length; i++){
            console.log("eval: " + this.extensions[i].name);
            await eval(this.extensions[i].function);
        };*/
    }

    async getFuncList(){
        /*let args = [];
        for(let i = 0; i < this.extensions.length; i++){
            //call function first
            //await eval(this.extensions[i].function);
            
            //args.push(eval(this.extensions[i].name));
            args.push(this.extensions.function)
        }
        console.log(this.funcList);*/
    }

    async getExtensions(){
        await this.getExtensionConfig().then(() => 
            this.getExtensionFunc().then(() => 
                this.loadExtensionFunc().finally(() => 
                    this.getFuncList())));
    }


}

console.log("extend write:");
console.log(dotExtFuncs)



var extMgr = new ExtensionManager(); 

export {Extension, ExtensionManager, extMgr};
