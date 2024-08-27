function description(Base) {
    class Description extends Base {
        constructor(_desc = null) {
            super();
            this.description = _desc;
        }
    }
    return Description;
}