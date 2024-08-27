import { extMgr } from "./extend.js";

export var dotExtFuncs = [];

await extMgr.getExtensions();

class DotBase {
    #parent
    children;
    li;
    ul;

    constructor(){
        this.#parent = null;
        this.children = [];
        this.li = document.createElement("li");
        this.ul = document.createElement("ul")
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


    //
    assignParent(_parent){
        this.#parent = null;
    }

    removeParent(){
        this.#parent = null;
    }

    addChild(_child){
        //Check to make sure new child is not already in children
        console.log("addChild _child:")
        console.log(_child);
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

class Dot extends extender(...dotExtFuncs){
    #parent;
    children;
    #li;
    ul;

    constructor(_parent = null, _children = []){
        super();

        if(_parent == null){
            _parent = dotHead
        }
        if(_children == null){
            _children = [];
        }

        this.assignParent(_parent);
        
        _children.forEach(_child => {
            new Dot(this, _child.children);
        });
    
    }
    
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

    //Override to set to Dot Head
    removeParent(){
        this.assignParent(dotHead);
    }

    //Override to prevent adding Dot Head as child
    addChild(_child){
        //Can't have a dot in this direct parental lineage be assigned child
        let nextParent = this.parent
        let isChildParent = false;
        while (nextParent !== dotHead) {
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

export {Dot};
export {dotHead};