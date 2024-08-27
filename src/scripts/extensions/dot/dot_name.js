function dot_name(Base) {
    class Dot_Name extends Base {
        constructor(_name = "default name") {
            super();
            this.name = _name;
            this.li.innerHTML += "<text id=\"dot_name\">" + this.name + "</text>"
        }
    }
    return Dot_Name;
}