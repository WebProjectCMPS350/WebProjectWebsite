

class Class{
    #name;
    #course;
    #instructor;
    #students;

    constructor(name, course, instructor){
        this.#name = name;
        this.#students=[];
        this.#course = course;
        this.#instructor = instructor;
    }

    get name() {
        return this.#name;

    }

    set name(newName){
        this.#name = newName;
    }

    get students() {
        return this.#students;
    }

    get course() {
        return this.#course;

    }

    set course(course){
        this.#course = course;
    }

    get instructor() {
        return this.#instructor;

    }

    set instructor(instructor){
        this.#instructor = instructor;
    }

    getStudentsNo() {
        return -1;
    }



}

export default Class;