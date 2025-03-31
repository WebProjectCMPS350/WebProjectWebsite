import User from "./User.js";

class Instructor extends User{
    #calsses = [];
    #expertiseAreas;

    constructor(name, username, password, clas){
        super(name, username, password);
        this.#calsses.push(clas);
        this.#expertiseAreas = [];
    }

    get calsses() {
        return this.#calsses;
    }

    get expertiseAreas() {
        return this.#expertiseAreas;

    }



}


export default Instructor;