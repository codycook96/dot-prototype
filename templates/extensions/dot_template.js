function dot_template(Base) {
    class Dot_Template extends Base {
        constructor(params = {}){   
            super(params);
            const objParams = Object.assign({
                debug: null,
                template: "Template",
            }, params);
            
            this._template = objParams.template;
            this._elements_dot_template=[];
            this._elements_dot_template.push(document.createElement('p'));
            this._elements_dot_template[0].id="dot-template";
            this._style_dot_template = document.createElement('style');

            if (objParams.debug != null){
                objParams.debug.con(this, undefined, "Dot_Template [" + this._template + "]");
            }
        }
        set template(_template = null){
            this._template = _template;
            this.update();
        }
        get template(){
            return this._template;
        }

        update(){
            super.update();

            this._elements_dot_template[0].innerHTML = this._template;
            
            //Define Style
            this._style_dot_template.appendChild(document.createTextNode(`
                #dot-template { 
                  color: #bbc;
                  font-size: 16px;
                }`
              ));
            
            //Add style to DOPM if not already added
            const head = document.getElementsByTagName('head')[0];
            if(!head.contains(this._style_dot_template)){
                head.appendChild(this._style_dot_template);
            }
            
            //Add element if not already added
            if(!this.div.contains(this._elements_dot_template[0])){
                this.div.insertAdjacentElement('beforeend',this._elements_dot_template[0]);
            } 
        }
    }
    return Dot_Template;
}