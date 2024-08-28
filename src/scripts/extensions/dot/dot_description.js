function dot_description(Base) {
    class Dot_Description extends Base {  
        constructor() {
            super();

            this._elements_dot_description = [];
            this._elements_dot_description.push(document.createElement('p'));
            this._style_dot_description = document.createElement('style');
        }
        set description(_desc = null){
            this._description = _desc
            this.update()
        }
        get description(){
            return this._description;
        }

        update(){
            super.update();
            
            this._elements_dot_description[0].id="dot-description";
            this._elements_dot_description[0].innerHTML = this._description;
            
            //Define Style
            this._style_dot_description.appendChild(document.createTextNode(`
                #dot-description { 
                  color: #99a;
                  font-size: 14px; 
                }`
              ));
            
            //Add style to DOPM if not already added
            const head = document.getElementsByTagName('head')[0];
            if(!head.contains(this._style_dot_description)){
                head.appendChild(this._style_dot_description);
            }
            
            //this._elements_dot_name[0].setAttribute("style", this._style_dot_name);
            //Add element if not already added
            if(!this.div.contains(this._elements_dot_description[0])){
                this.div.insertAdjacentElement('beforeend',this._elements_dot_description[0]);
            }
        } 
    }
    return Dot_Description;
}