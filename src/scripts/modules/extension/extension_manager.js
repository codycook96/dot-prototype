import { debug } from "../debug/debug.js";
import { Extension } from "./extension.js";
import { FileManager } from "../file/file_manager.js";
import { extensions } from "./extensions_global.js";

class ExtensionManager{
    path;
    #extensions;
    #scripts;
    #fileManager;
    constructor(params = {}){
        //Assign defaults for destructured parameters
        let modParams = Object.assign({
            extensions: [],
            scripts: [],
            path: "",
            fileManager: new FileManager()
        }, params);

        this.path = modParams.path;
        this.#extensions = modParams.extensions;
        this.#scripts = modParams.scripts;
        this.#fileManager = modParams.fileManager;

        debug.con(this);
    }

    async importExtensionConfigs(){
        let text = await this.#fileManager.readFile(this.path);

        let importJSON = JSON.parse(text);
        let extArr = importJSON.extensions;

        extArr.forEach(_obj => {
            this.#extensions.push(new Extension({
                module: _obj.module,
                name: _obj.name, 
                path: _obj.path,
                version: _obj.version,
                author: _obj.author,
                enabled: _obj.enabled,
            }))
        });
    }

    async importExtensionScripts(){
        for (let i = 0; i < this.#extensions.length; i++){
            let text = await this.#fileManager.readFile(this.#extensions[i].path);

            this.#extensions[i].script = new Function("return " + text)();
            this.#scripts.push(this.#extensions[i].script);
        };
    }

    async setExtensionsGlobal(){
        for (let i = 0; i < this.#extensions.length; i++){
            if(this.#extensions[i].enabled){
                let mod = this.#extensions[i].module;
                //extensions[mod].push(this.#extensions[i].script)
                extensions.push(this.#extensions[i].script);
                this.#extensions[i].loaded = true;
            }
            else{
                this.#extensions[i].loaded = false;
            }
        };
    }

    async importExtensions(){
        await this.importExtensionConfigs();
        await this.importExtensionScripts();
        await this.setExtensionsGlobal();
    }
}

export { ExtensionManager };