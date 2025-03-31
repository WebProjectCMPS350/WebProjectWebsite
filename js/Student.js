import User from "./User.js";
import { nanoid } from "../node_modules/nanoid/nanoid.js";


class Student extends User{
    #id;
    #completedCourses;
    #learningPath;

    constructor(name, username, password, id){
        super(name, username, password);
        this.#id = id;
        this.#completedCourses = [];
        this.#learningPath = [];
    }

    get id() {
        return this.#id;
    }




}


export default Student;