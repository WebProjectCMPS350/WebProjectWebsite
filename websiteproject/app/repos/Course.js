import fse from 'fs-extra';
import path from 'path';
import { nanoid } from 'nanoid';
class Course{
    #courseNo;
    #name;
    #classList;
    #category;
    #status;

    constructor(name, category, courseNo){
        this.#courseNo;
        this.#name = name;
        this.#classList=[];
        this.#category = category;
        this.#status = 'Pending';
        this.coursesFilePath = path.join(process.cwd(), 'app/data/courses.json'); // 
    }

    async saveCourses(courses) {
        await fse.writeJson(this.coursesFilePath, courses);
    }

    async getCourses(type) {
        console.log('called with ', type);
        
        // readson will conert the json file into js file
        const courses = await fse.readJson(this.coursesFilePath);
        
        // Return all accounts 
        /*if (type) {
            return courses.filter(course => course.acctType.toLowerCase() == type.toLowerCase());
        }*/

        // Else return saving or current accounts
        return courses;
    }

    async getCourse(CourseNo) {
        const courses = await this.getCourses();
        const course = courses.find(course => course.accountNo == accountNo);
        if (!course) {
            return { error: 'Account not found' };
        }
        return account;
    }

    async createCourse(course) {
        const courses = await this.getCourses();
        //course.id = nanoid();
        courses.push(course);
        await this.saveCourses(courses);
        return course;
    }

    async updateCourse(courseNo, course) {
        const courses = await this.getCourses();

        const index = courses.findIndex(course => course.courseNo == courseNo);

        if (index < 0) {
            return { error: 'course not found' };
        }
        courses[index] = { ...courses[index], ...course };

        await this.saveCourses(courses);
        return courses[index];
    }

    async deleteCourse(courseNo) {
        const courses = await this.getCourses();
        const index = courses.findIndex(course => course.courseNo == courseNo);
        if (index < 0) {
            return { error: 'course not found' };
        }
        courses.splice(index, 1);
        await this.saveCourses(courses);
        // Why inside an Object?
        return { message: 'course deleted successfully' };
    }

    get name() {
        return this.#name;

    }

    set name(newName){
        this.#name = newName;
    }

    get courseNo() {
        return this.#courseNo;

    }

    set courseNo(newCourseNo){
        this.#name = newCourseNo;
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

    static async read(){
        const response = await fetch("../data/courses.json")
        return response.json();
    }

    static async write(courses){
        const response = await fetch("../data/courses.json")
        const cs = response.json();
    }



}

export default Course;