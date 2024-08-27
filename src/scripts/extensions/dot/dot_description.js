function description(Base) {
    class Description extends Base {
        constructor() {
            super();
            this._elements_dot_description = [];
            this._elements_dot_description.push(document.createElement('p'));
            this._style_dot_description = document.createElement('style');

            this.update();
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
                  color: #33AA99; 
                }`
              ));
            
            //Add style to DOPM if not already added
            const head = document.getElementsByTagName('head')[0];
            if(!head.contains(this._style_dot_description)){
                head.appendChild(this._style_dot_description);
            }
            
            //this._elements_dot_name[0].setAttribute("style", this._style_dot_name);
            //Add element if not already added
            if(!this.li.contains(this._element_dot_description)){
                this.li.insertAdjacentElement('afterbegin',this._elements_dot_description[0]);
            }
        } 
    }
    return Description;
}