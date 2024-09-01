import { debug } from "../debug/debug.js";
import { DotBase } from "./dot_base.js";
import { dotHead } from "./dot_head.js";
import { extensions } from "../extension/extensions_global.js";

//Extender uses reduce to allow for extending of multiple classes
const creator = (allExtensions, extension) => extension(allExtensions);
const extender = (...parts) => parts.reduce(creator, DotBase);

class Dot extends extender(...extensions){
    constructor(params = {}){
        //Assign defaults for destructured parameters

        let modParams = Object.assign({
            debug: debug, //extended classes need to pass debug object to subclasses
            parent: undefined, 
            children: [],
        }, params);

        //Ensure parameters are passed to base and extension classes
        super(modParams);

        if(modParams.parent === undefined ||
            modParams.parent === null){
            modParams.parent = dotHead;
        }

        //Assign parent and ensure parent included this in children
        this.assignParent(modParams.parent);
        //super.assignParent(modParams.parent);

        //Create and link child dots for all in children parameter
        modParams.children.forEach(child => {
            new Dot({
                parent: this, 
                children: child.children, 
            });
        });

        //Call initial update
        this.update();

        debug.con(this);
    }
    
    update(){
        //Update base and all extension classes
        super.update();
    }

    //assignParent(_parent){}

    //Override to set to Dot Head as default
    removeParent(){
        this.assignParent(dotHead);
    }

    //Override to prevent adding Dot Head as child
    addChild(_child){
        //Can't have a dot in this direct parental lineage be assigned child
        let nextParent = this.parent
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
}

export {Dot};