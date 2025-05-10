const baseUrl = "/api/classes";
import courseRepo from "./Course.js";

class Class {
  async getClasses() {
    const response = await fetch(baseUrl);
    return response.json();
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
    return await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clas),
    });
  }

  async updateClass(clas) {
    return await fetch(baseUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clas),
    });
  }

  async deleteClass(clas) {
    return await fetch(`${baseUrl}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clas),
    });
  }

  async getParentCourse(classNo) {
    const response = await fetch(
      `${baseUrl}/getParentCourse?classNo=${classNo}`
    );
    return response.json();
  }

  async getClassesByInstructorName(instructorName) {
    const classes = await this.getClasses();
    const instructorClasses = classes.filter(
      (clas) => clas.instructor === instructorName
    );
    return instructorClasses;
  }
}

export default new Class();
