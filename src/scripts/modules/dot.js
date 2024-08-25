class DotBase {
    name;
    #parent;
    #children;

    constructor(_name, _parent = null){
        this.name= _name;
        this.#children = [];

        //If parent is defined, link parent to this child
        if (_parent !== null) {
            this.#parent = _parent;
            _parent.addChild(this);
        }
    }

    get parent(){
        return this.#parent;
    }


    //set parent(_parent){}

    get children(){
        return this.#children;
    }

    //set children(_children){}

    assignParent(_parent){
        //Check to see if new parent already is parent
        if(_parent !== this.#parent){
            //Store old parent
            let oldParent = this.#parent;

            //Assign new parent
            this.#parent = _parent;

            //Check if old parent has this child in its children, if so remove it
            let index = oldParent.children.indexOf(this);
            if(index !== -1) {
                oldParent.removeChild(this);
            }

            //Add self to child list of new parent
            _parent.addChild(this);
        }
        else{
            //throw new Error('Error: Dot.asignParent - ' + _parent.name + ' is already assigned as parent of ' + this.name + '.');
        }

    }

    removeParent(){
        this.#parent = null;
    }

    addChild(_child){
        //Can't have a dot in this direct parental lineage be assigned child
        let nextParent = this.parent
        let isChildParent = false;
        while (nextParent != null) {
            if (nextParent === _child){
                throw new Error('Error: Dot.addChild - ' + _child.name + ' is in ' + this.name + '\'s parental lineage and so cannot be added as a child.');
            }
            nextParent = nextParent.parent;
        }

        //Check to make sure new child is not already in children
        let index = this.#children.indexOf(_child);
        if(index === -1) {
            //Add child to children of this dot
            this.#children.push(_child);
        }
        else{
            //throw new Error('Error: Dot.addChild - ' + _child.name + ' is already in children of ' + this.name + '.');
        }

        //If child has not assigned this dot as parent, do so
        if(_child.parent !== this){
            _child.assignParent(this);
        }
    }

    removeChild(_child){
        //Check to see if child is in this dot's children
        let index = this.#children.indexOf(_child);
        if(index === -1) {
            throw new Error('Error: Dot.removeChild - ' + _child.name + ' is not a child of ' + this.name + '.');
        }
        else{
            this.#children.splice(index, 1);
        }

        //Ensure old child does not still have this dot as parent, if so remove it.
        if(_child.parent === this){
            _child.removeParent();
        }

    }

    list(sLevel){
        let sList = sLevel + "+ " + this.name + "\n";
        
        this.children.forEach(child => {
            sList = sList + child.list("|   " + sLevel);
        });

        return sList;
    }
}

const dotHead = new DotBase("head");

class Dot extends DotBase{
    constructor(_name, _parent = dotHead){
        super(_name, _parent)
        this.name= _name;
        this.assignParent(_parent);
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
                throw new Error('Error: Dot.addChild - ' + _child.name + ' is in ' + this.name + '\'s parental lineage and so cannot be added as a child.');
            }
            nextParent = nextParent.parent;
        }

        //Check to make sure new child is not already in children
        let index = this.children.indexOf(_child);
        if(index !== -1) {
            throw new Error('Error: Dot.addChild - ' + _child.name + ' is already in children of ' + this.name + '.');
        }

        //Add child to children of this dot
        super.addChild(_child);

        //If child has not assigned this dot as parent, do so
        if(_child.parent !== this){
            _child.assignParent(this);
        }
    }
}

export {Dot};
export {dotHead};