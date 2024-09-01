import { debug } from "../debug/debug.js";

class Extension{
    constructor(params = {}){
        //Assign defaults for destructured parameters
        let modParams = Object.assign({
            module: "",
            name: "", 
            path: "",
            version: "",
            author: "",
            enabled: false,
            script: "",
            loaded: false
        }, params);
        this.module = modParams.module;
        this.name = modParams.name;
        this.path = modParams.path;
        this.version = modParams.version;
        this.author = modParams.author;
        this.enabled = modParams.enabled;
        this.script = modParams.script;
        this.loaded = modParams.loaded;

        debug.con(this, undefined, "Extension [" + this.name + "]");
    }
}

export {Extension};