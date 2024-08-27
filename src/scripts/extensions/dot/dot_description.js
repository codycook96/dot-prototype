function description(Base) {
    class Description extends Base {
        constructor(_desc = "default_description") {
            super();
            this.description = _desc;
        }
    }
    return Description;
}