import fse from "fs-extra";
import path from "path";
import classRepo from "./Class.js";

class Instructor {
  constructor() {
    this.instructorsFilePath = path.join(
      process.cwd(),
      "app/data/instructors.json"
    ); //
  }

  async saveInstructors(instructors) {
    await fse.writeJson(this.instructorsFilePath, instructors);
  }

  async getInstructors() {
    const instructors = await fse.readJson(this.instructorsFilePath);
    return instructors;
  }

  async getInstructor(username) {
    const instructors = await this.getInstructors();
    const instructor = instructors.find(
      (instructor) => instructor.username == username
    );
    if (!instructor) {
      return { error: "Instructor not found" };
    }
    return instructor;
  }

  async createInstructor(instructor) {
    const instructors = await this.getInstructors();
    //course.id = nanoid();
    instructors.push(instructor);
    await this.saveInstructors(instructors);
    return instructor;
  }

  async updateInstructor(username, instructor) {
    const instructors = await this.getInstructors();

    const index = instructors.findIndex(
      (instructor) => instructor.username == username
    );

    if (index < 0) {
      return { error: "Instructor not found" };
    }
    instructors[index] = { ...instructors[index], ...instructor };

    await this.saveInstructors(instructors);
    return instructors[index];
  }

  async deleteInstructor(username) {
    const instructors = await this.getInstructors();
    const index = instructors.findIndex(
      (instructor) => instructor.username == username
    );
    if (index < 0) {
      return { error: "Instructor not found" };
    }
    instructors.splice(index, 1);
    await this.saveInstructors(instructors);
    return { message: "Instructor deleted successfully" };
  }

  async getTotalInstructors() {
    const instructors = await this.getInstructors();
    return instructors.length;
  }

  async getInstructorLoad(instructorName) {
    const instructorClasses = await classRepo.getClassesByInstructor(
      instructorName
    );

    const totalClasses = instructorClasses.length;
    const totalStudents = instructorClasses.reduce(
      (sum, cls) => sum + (cls.noOfStudents || 0),
      0
    );

    return {
      name: instructorName,
      totalClasses,
      totalStudents,
    };
  }

  async getInstructorsLoad() {
    const instructors = await this.getInstructors();
    const instructorLoadPromises = instructors.map((instructor) =>
      this.getInstructorLoad(instructor.name)
    );

    const instructorLoads = await Promise.all(instructorLoadPromises);
    instructorLoads.sort((a, b) => b.totalStudents - a.totalStudents);

    return instructorLoads;
  }
}

export default new Instructor();
