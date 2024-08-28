import { loadNextScript } from "../loader.js";
import { extMgr } from "./extend.js";
import { fileMgr } from "./file.js";

var loadFlag_Dot = false;

await extMgr.getExtensions();

class DotBase {
    #parent
    children;
    li;
    div;
    ul;

    constructor(_parent = null, _children = []){
        this.#parent = _parent;
        this.children = _children;

        this.li = document.createElement("li");
        this.ul = document.createElement("ul");
        this.div = document.createElement("div");
        this.li.id = "dot-view-li";
        this.ul.id = "dot-view-ul";
        this.div.id = "dot-view-div";
        this.li.appendChild(this.div);
        this.li.appendChild(this.ul);
        
    }

    get parent(){
        return this.#parent;
    }

    //set parent(_parent){}

    get children(){
        return this.children;
    }

    //set children(_children){}
    
    update(){
        return;
    }

    //
    assignParent(_parent){
        //Check to see if new parent already is parent
        if(_parent != null){

            if(_parent !== this.#parent){
                //Store old parent
                let oldParent = this.#parent;

                //Assign new parent
                this.#parent = _parent;

                //Check if old parent has this child in its children, if so remove it
                if(oldParent != null){
                    let index = oldParent.children.indexOf(this);
                    if(index !== -1) {
                        oldParent.removeChild(this);
                    }
                }

                //Add self to child list of new parent
                _parent.addChild(this);
            }
            else{
                //throw new Error('Error: Dot.asignParent - ' + _parent.name + ' is already assigned as parent of ' + this.name + '.');
            }
        }
    }

    removeParent(){
        this.#parent = null;
    }

    addChild(_child){
        //Check to make sure new child is not already in children
        let index = this.children.indexOf(_child);
        if(index === -1) {
            //Add child to children of this dot
            this.children.push(_child);
            this.ul.appendChild(_child.li);
        }

        //If child has not assigned this dot as parent, do so
        if(_child.parent !== this){
            _child.assignParent(this);
        }
    }

    removeChild(_child){
        //Check to see if child is in this dot's children
        let index = this.children.indexOf(_child);
        if(index === -1) {
            throw new Error('Error: Dot.removeChild - dot is not a child of other dot.');
        }
        else{
            this.children.splice(index, 1);
            this.ul.removeChild(_child);
        }

        //Ensure old child does not still have this dot as parent, if so remove it.
        if(_child.parent === this){
            _child.removeParent();
        }

    }
}

const dotHead = new DotBase();

const creator = (allExtensions, extension) => extension(allExtensions);
const extender = (...parts) => parts.reduce(creator, DotBase);

class Dot extends extender(...extMgr.functions){
    constructor(_parent = null, _children = []){
        super();
        
        this.li = document.createElement("li");
        this.ul = document.createElement("ul");
        this.div = document.createElement("div");
        this.li.id = "dot-view-li";
        this.ul.id = "dot-view-ul";
        this.div.id = "dot-view-div";
        this.li.appendChild(this.div);
        this.li.appendChild(this.ul);

        if(_parent == null){
            _parent = dotHead
        }
        if(_children == null){
            _children = [];
        }
 
        this.assignParent(_parent);

        this.children = [];
        _children.forEach(_child => {
            new Dot(this, _child.children);
        });
    
    }
    
    update(){
        super.update();
        return;
    }

    /*assignParent(_parent){
        //Check to see if new parent already is parent
        if(_parent != null){

            if(_parent !== this.#parent){
                //Store old parent
                let oldParent = this.#parent;

                //Assign new parent
                this.#parent = _parent;

                //Check if old parent has this child in its children, if so remove it
                if(oldParent != null){
                    let index = oldParent.children.indexOf(this);
                    if(index !== -1) {
                        oldParent.removeChild(this);
                    }
                }

                //Add self to child list of new parent
                _parent.addChild(this);
            }
            else{
                //throw new Error('Error: Dot.asignParent - ' + _parent.name + ' is already assigned as parent of ' + this.name + '.');
            }
        }
    }*/

    //Override to set to Dot Head
    removeParent(){
        this.assignParent(dotHead);
    }

    //Override to prevent adding Dot Head as child
    addChild(_child){
        //Can't have a dot in this direct parental lineage be assigned child
        let nextParent = this.parent
        let isChildParent = false;
        while ((nextParent != null) && (nextParent !== dotHead)) {
            if (nextParent === _child){
                throw new Error('Error: Dot.addChild - dot is in other dot\'s parental lineage and so cannot be added as a child.');
            }
            nextParent = nextParent.parent;
        }

        //Check to make sure new child is not already in children
        let index = this.children.indexOf(_child);
        if(index !== -1) {
            throw new Error('Error: Dot.addChild - dot is already in children of other dot.');
        }

        //Add child to children of this dot
        super.addChild(_child);

        //If child has not assigned this dot as parent, do so
        if(_child.parent !== this){
            _child.assignParent(this);
        }
    }

    draw(list){
        list.innerHTML = "";
        this.children.forEach(child => {
            let li = document.createElement("li");
            let ul = document.createElement("ul")
            li.innerHTML = "&#11044 " + child.name
            li.appendChild(ul);
            list.appendChild(li);
            drawDots(child, ul)
        });
    
    }
}


async function importDots(path){

    let data = "";

    data = await fileMgr.readFile(path);

    let importJSON = JSON.parse(data);
    let dotArr = importJSON.dots;

    dotArr.forEach(_obj => {

        let newDot = new Dot(dotHead)
        
        for(var prop in _obj){
            if(prop !== "children" && prop !== "parent"){
                newDot[prop] = _obj[prop];
            }
        }

        dotHead.addChild(newDot);
        
        createDots(newDot, _obj);

    });  
}

function createDots(_dot, _obj){
    _obj.children.forEach( ocd => {
        let newDot = new Dot(_dot)
        for(var prop in ocd){
            if(prop !== "children" && prop !== "parent"){
                newDot[prop] = ocd[prop];
            }
        }
        //_dot.addChild(newDot);
        if(ocd.children.length > 0){
            createDots(newDot, ocd);
        }
    })
    
}

//using global dotHead
async function exportDots(path){
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
    //TODO
    //Add file output / download
    //console.log(text);
}







var dotFilePath = "../test/dots.json"

await importDots(dotFilePath);

loadFlag_Dot = true;


loadNextScript();


export {Dot};
export {dotHead};