import { debug } from "../debug/debug.js";

class DotBase {
    #parent
    children;
    li;
    div;
    ul;

    constructor(params = {}){   
        let modParams = Object.assign({
            parent: null, 
            children: [],
        }, params);

        this.#parent = modParams.parent;
        this.children = modParams.children;

        this.li = document.createElement("li");
        this.ul = document.createElement("ul");
        this.div = document.createElement("div");
        this.li.id = "dot-view-li";
        this.ul.id = "dot-view-ul";
        this.div.id = "dot-view-div";
        this.li.appendChild(this.div);
        this.li.appendChild(this.ul);
        
        debug.con(this, undefined, "DotBase");
    }

    get parent(){
        return this.#parent;
    }

    //set parent(_parent){} //Disallow

    get children(){
        return this.children;
    }

    //set children(_children){} //Disallow
    
    update(){
        return;
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
                //Check if this is member of children on parent
                
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
            this.ul.removeChild(_child.li);
        }

        //Ensure old child does not still have this dot as parent, if so remove it.
        if(_child.parent === this){
            _child.removeParent();
        }

    }

    clearChildren(){
        this.children = [];
    }
}

export { DotBase }