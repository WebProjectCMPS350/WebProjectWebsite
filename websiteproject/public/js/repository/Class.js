import fse from 'fs-extra';
import path from 'path';
import { nanoid } from 'nanoid';


class Class {
  #name;
  #classNo;
  #course;
  #instructor;
  #students;

  constructor(name, course, instructor, classNo) {
    this.#name = name;
    this.#students = [];
    this.#course = course;
    this.#classNo = classNo;
    this.#instructor = instructor;
    this.classFilePath = path.join(process.cwd(), "app/data/classes.json"); //
  }

  async saveClasses(classes) {
    await fse.writeJson(this.classFilePath, classes);
  }

  async getClasses() {
    const classes = await fse.readJson(this.classFilePath);
    return classes;
  }

  async getClass(classeNo) {
    const classes = await this.getClasses();
    const clas = classes.find((clas) => clas.classeNo == classeNo);
    if (!clas) {
      return { error: "Class not found" };
    }
    return clas;
  }

  async createClass(clas) {
    const classes = await this.getClasses();
    //course.id = nanoid();
    classes.push(clas);
    await this.saveClasses(classes);
    return clas;
  }

  async updateClass(classeNo, clas) {
    const clases = await this.getClasses();

    const index = clases.findIndex((c) => c.classNo == classeNo);

    if (index < 0) {
      return { error: "Class not found" };
    }
    clases[index] = { ...clases[index], ...clas };

    await this.saveClasses(clases);
    return clases[index];
  }

  async deleteClass(classNo) {
    const classes = await this.getClasses();
    const index = classes.findIndex((clas) => clas.classNo == classNo);
    if (index < 0) {
      return { error: "course not found" };
    }
    classes.splice(index, 1);
    await this.saveClasses(classes);
    // Why inside an Object?
    return { message: "Class deleted successfully" };
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get classNo() {
    return this.#classNo;
  }

  set classNo(newClassNo) {
    this.#classNo = newClassNo;
  }

  get students() {
    return this.#students;
  }

  get course() {
    return this.#course;
  }

  set course(course) {
    this.#course = course;
  }

  get instructor() {
    return this.#instructor;
  }

  set instructor(instructor) {
    this.#instructor = instructor;
  }

  getStudentsNo() {
    return -1;
  }
}

export default Class;
