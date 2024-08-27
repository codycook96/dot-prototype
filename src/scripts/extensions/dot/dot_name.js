function dot_name(Base) {
    class Dot_Name extends Base {
        constructor() {
            super();
            this._elements_dot_name = [];
            this._elements_dot_name.push(document.createElement('p'));
            this._style_dot_name = document.createElement('style');

            this.update();
        }
        set name(_name = null){
            this._name = _name
            this.update();
        }
        get name(){
            return this._name;
        }
        update(){
            super.update();
            this._elements_dot_name[0].id="dot-name";
            this._elements_dot_name[0].innerHTML = this._name;
            

            //Define Style
            this._style_dot_name.appendChild(document.createTextNode(`
                #dot-name { 
                  color: #336699; 
                }`
              ));
            
            //Add style to DOPM if not already added
            const head = document.getElementsByTagName('head')[0];
            if(!head.contains(this._style_dot_name)){
                head.appendChild(this._style_dot_name);
            }
            
            //this._elements_dot_name[0].setAttribute("style", this._style_dot_name);
            //Add element if not already added
            if(!this.li.contains(this._element_dot_name)){
                this.li.insertAdjacentElement('afterbegin',this._elements_dot_name[0]);
            } 
        }
    }
    return Dot_Name;
}