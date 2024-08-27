function dot_name(Base) {
    class Dot_Name extends Base {
        #name
        constructor(_name = null) {
            super();
            //this.#name = _name;
            //this.li.insertAdjacentHTML('afterbegin',this.#name);
            //this.li.draggable=true;
            //"<li><text id=\"dot_name\">" + this.#name + "</text>" + this.li.innerHTML + "</li>";
        }
        set name(_name = null){
            this.#name = _name
            this.li.insertAdjacentHTML('afterbegin',this.#name); 
            this.li.draggable=true; 
        }
        get name(){
            return this.#name;
        }
    }
    return Dot_Name;
}