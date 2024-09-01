class FileManager{
    constructor(){
        this.basis = true;
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

export { FileManager};

