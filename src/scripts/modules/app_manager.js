//import { FileManager } from "./file/file_manager.js"
//import { ExtensionManager } from "./extension/extension_manager.js";
//import { DotManager } from "
//import { ExtensionManager } from "./extension/extension_manager.js";
//import { FileManager } from "./file/file_manager.js";
import { extensions } from "./extension/extensions_global.js";
import { dotHead } from "./dot/dot_head.js";
import { debug } from "./debug/debug.js";

class AppManager{
    fileManager;
    extensionManager;
    dotManager;
    dotfilePath;
    ul;
    constructor(params = {}){
        //Assign defaults for destructured parameters
        let modParams = Object.assign({
            fileManager: null,
            extensionManager: null,
            dotManager: null,
            dotfilePath: "",
            ul: document.createElement("ul")
        }, params);

        this.dotfilePath = modParams.dotfilePath;

        //DELETE ME TODO FIX ME
        this.dotfilePath = "/test/dots.json";

        this.ul = modParams.ul;

        //this.loadFile().then(
         //   this.loadExtensions().then(
          //      this.loadDots()));
        
    }

    async loadFile(){
        if (this.fileManager == null){
            let modFM = await import("./file/file_manager.js");
            this.fileManager = new modFM.FileManager();
        }
    }

    async loadExtensions(){
        let modEM = await import("./extension/extension_manager.js");

        if(this.ExtensionManager == null){
            this.extensionManager = new modEM.ExtensionManager({
                path: this.dotfilePath,
                fileManager: this.fileManager
            });
        }
        await this.extensionManager.importExtensions();
    }

    async loadDots(){
        let modDM = await import("./dot/dot_manager.js");
        this.dotManager = new modDM.DotManager({
            path: this.dotfilePath,
            fileManager: this.fileManager,
        });

        dotHead.clearChildren();
        this.ul.innerHTML = "";

        await this.dotManager.importDots();

        dotHead.children.forEach(dot => {
            this.ul.appendChild(dot.li);
        });
    }

}

export {AppManager};