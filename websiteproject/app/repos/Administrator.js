import User from "./User.js";
import fse from "fs-extra";
import path from "path";
import { nanoid } from "nanoid";

class Administrator extends User{
    #calsses = [];

    constructor(name, username, password, clas){
        super(name, username, password);
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
        const instructor = instructors.find((instructor) => instructor.username == username);
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
    
        const index = instructors.findIndex((instructor) => instructor.username == username);
    
        if (index < 0) {
          return { error: "Instructor not found" };
        }
        instructors[index] = { ...instructors[index], ...instructor };
    
        await this.saveInstructors(instructors);
        return instructors[index];
      }
    
      async deleteInstructor(username) {
        const instructors = await this.getInstructors();
        const index = instructors.findIndex((instructor) => instructor.username == username);
        if (index < 0) {
          return { error: "Instructor not found" };
        }
        instructors.splice(index, 1);
        await this.saveInstructors(instructors);
        return { message: "Instructor deleted successfully" };
      }




}


export default Administrator;