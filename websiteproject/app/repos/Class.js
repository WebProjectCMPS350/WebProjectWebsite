import fse from "fs-extra";
import path from "path";
import courseRepo from "./Course.js"; // Import the course repository

class Class {
  constructor() {
    this.classFilePath = path.join(process.cwd(), "app/data/classes.json"); //
  }

  async saveClasses(classes) {
    await fse.writeJson(this.classFilePath, classes);
  }

  async getClasses() {
    const classes = await fse.readJson(this.classFilePath);
    return classes;
  }

  async getClass(classNo) {
    const classes = await this.getClasses();
    const clas = classes.find((clas) => clas.classNo == classNo);
    if (!clas) {
      return { error: "Class not found" };
    }
    return clas;
  }

  async createClass(clas) {
    const classes = await this.getClasses();
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
    return { message: "Class deleted successfully" };
  }

  async getParentCourse(classNo) {
    const clas = await this.getClass(classNo);
    const courseNo = await clas.parentCourse;

    return await courseRepo.getCourse(courseNo);
  }

  async getClassesByInstructor(name) {
    const classes = await this.getClasses();
    const filteredClasses = classes.filter((clas) => clas.instructor == name);
    return filteredClasses;
  }

  async getPendingClasses() {
    const classes = await this.getClasses();
    const filteredClasses = classes.filter((clas) => clas.status == "Pending");
    return filteredClasses.length;
  }

  async getOpenClasses() {
    const classes = await this.getClasses();
    const filteredClasses = classes.filter((clas) => clas.status == "Open");
    return filteredClasses.length;
  }

  async getCurrentClasses() {
    const classes = await this.getClasses();
    const filteredClasses = classes.filter((clas) => clas.status == "Current");
    return filteredClasses.length;
  }

  async getClosedClasses() {
    const classes = await this.getClasses();
    const filteredClasses = classes.filter((clas) => clas.status == "Closed");
    return filteredClasses.length;
  }
}

export default new Class();
