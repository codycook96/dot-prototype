function dot_expand(Base) {
    class Dot_Expand extends Base {
        constructor(params = {}){   
            super(params);
            const objParams = Object.assign({
                debug: null,
                expanded: true,
            }, params);
            
            this._expanded = objParams.expanded;
            this._elements_dot_expand=[];
            //this._elements_dot_expand.push(document.createElement('p'));
            //this._elements_dot_expand[0].id="dot-expand";
            this._style_dot_expand = document.createElement('style');

            this.div.addEventListener("click", (event) => {
                this.expanded = !this.expanded;
                this.update();
            });

            if (objParams.debug != null){
                objParams.debug.con(this, undefined, "Dot_Expand");
            }
        }
        set expand(_expand){
            this._expand = _expand;
            this.update();
        }
        get expand(){
            return this._expand;
        }

        update(){
            super.update();

            //this._elements_dot_expand[0].innerHTML = this._expand;
            if(this.expanded){

                    this.ul.style.overflow = "hidden";
                    this.ul.style.transition = "max-height 1s, opacity 500ms, margin 250ms";
                    this.ul.style.maxHeight = "500px";
                    this.ul.style.opacity = "1";
                    this.ul.style.display = "block";
                    this.ul.style.marginTop = "10px";

            }
            else{

                    //this.ul.style.overflow = "hidden";
                    //this.ul.style.transition = "1s";
                    this.ul.style.transition = "max-height 250ms, opacity 250ms, margin 250ms";
                    this.ul.style.maxHeight = "0";
                    //this.ul.style.transform = "translateY(100px)";
                    this.ul.style.opacity = "0";
                    this.ul.style.marginTop = "0px";
                    //this.ul.style.display = "none";

            }

            
            //Define Style
            /*
            this._style_dot_expand.appendChild(document.createTextNode(`
                #dot-expand.expand {
                    margin-top: 0;
                    transition: all 1s;
                }
                #dot-expand.contract{
                    margin-top: -100%;
                    transition: 1s;
                }`
              ));
            */
            //Add style to DOPM if not already added
            const head = document.getElementsByTagName('head')[0];
            if(!head.contains(this._style_dot_expand)){
                head.appendChild(this._style_dot_expand);
            }

            //Add element if not already added
            //if(!this.div.contains(this._elements_dot_expand[0])){
             //   this.div.insertAdjacentElement('beforeend',this._elements_dot_expand[0]);
            //} 
        }
    }
    return Dot_Expand;
}