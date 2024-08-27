import { loadNextScript } from "../loader.js";

var loadFlag_File = false;

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
}

const fileMgr = new fileManager();

loadFlag_File = true;

loadNextScript();

export { fileMgr };

