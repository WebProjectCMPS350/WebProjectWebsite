import { readFile, writeFile } from 'fs/promises';
class Course{
    #name;
    #classList;
    #category;
    #status;

    constructor(name, category){
        this.#name = name;
        this.#classList=[];
        this.#category = category;
        this.#status = 'Pending';
    }

    get name() {
        return this.#name;

    }

    set name(newName){
        this.#name = newName;
    }

    get classList() {
        return this.#classList;
    }

    get category() {
        return this.#category;

    }

    set category(newCategory){
        this.#category = newCategory;
    }

    get status() {
        return this.#status;

    }

    set status(newStatus){
        this.#status = newStatus;
    }

    static async readCourses(){
        const response = await fetch("../data/courses.json")
        return response.json();
    }

    static async writeCourses(courses){
        const response = await fetch("../data/courses.json")
        const cs = response.json();
    }



}

export default Course;