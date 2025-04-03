import User from "./User.js";
import fse from 'fs-extra';
import path from 'path';
import { nanoid } from 'nanoid';

class Student extends User{
    #id;
    #completedCourses;
    #learningPath;

    constructor(name, username, password, id){
        super(name, username, password);
        this.#id = id;
        this.#completedCourses = [];
        this.#learningPath = [];
        this.studentsFilePath = path.join(process.cwd(), 'app/data/students.json'); // 
        
    }

    async saveStudents(students) {
            await fse.writeJson(this.studentsFilePath, students);
        }
    
        async getStudents() {
            const students = await fse.readJson(this.studentsFilePath);
            return students;
        }

    
        async getStudent(username) {
            const students = await this.getStudents();
            const student = students.find(student => student.username == username);
            if (!student) {
                return { error: 'Student not found' };
            }
            return student;
        }
    
        async createStudent(student) {
            const students = await this.getStudents();
            //course.id = nanoid();
            students.push(student);
            await this.saveStudents(students);
            return student;
        }
    
        async updateStudent(username, student) {
            const students = await this.getStudents();
    
            const index = students.findIndex(student => student.username == username);
    
            if (index < 0) {
                return { error: 'Student not found' };
            }
            students[index] = { ...students[index], ...student };
    
            await this.saveStudents(students);
            return students[index];
        }
    
        async deleteStudent(username) {
            const students = await this.getStudents();
            const index = students.findIndex(student => student.username == username);
            if (index < 0) {
                return { error: 'Student not found' };
            }
            students.splice(index, 1);
            await this.saveStudents(students);
            // Why inside an Object?
            return { message: 'Student deleted successfully' };
        }

    get id() {
        return this.#id;
    }




}


export default Student;