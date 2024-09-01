function dot_name(Base) {
    class Dot_Name extends Base {
        //constructor({name = "Dummy", ...rest} = {}) {
        constructor(params = {}){   
            super(params);
            const objParams = Object.assign({
                debug: null,
                name: "Default",
            }, params);
            let name = objParams.name;
            
            this._name = name;
            this._elements_dot_name=[];
            this._elements_dot_name.push(document.createElement('p'));
            this._elements_dot_name[0].id="dot-name";
            this._style_dot_name = document.createElement('style');

            if (objParams.debug != null){
                objParams.debug.con(this, undefined, "Dot_Name [" + this._name + "]");
            }
        }
        set name(_name = null){
            this._name = _name;
            this.update();
        }
        get name(){
            return this._name;
        }

        update(){
            super.update();

            this._elements_dot_name[0].innerHTML = this._name;
            
            //Define Style
            this._style_dot_name.appendChild(document.createTextNode(`
                #dot-name { 
                  color: #bbc;
                  font-size: 16px;
                }`
              ));
            
            //Add style to DOPM if not already added
            const head = document.getElementsByTagName('head')[0];
            if(!head.contains(this._style_dot_name)){
                head.appendChild(this._style_dot_name);
            }
            
            //this._elements_dot_name[0].setAttribute("style", this._style_dot_name);
            //Add element if not already added
            if(!this.div.contains(this._elements_dot_name[0])){
                this.div.insertAdjacentElement('beforeend',this._elements_dot_name[0]);
            } 
        }
    }
    return Dot_Name;
}