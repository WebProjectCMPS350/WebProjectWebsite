const baseUrl = "/api/students";
import User from "./User.js";

class Student extends User {
  #id;
  #completedCourses;
  #learningPath;

  constructor(name, username, password, id) {
    super(name, username, password);
    this.#id = id;
    this.#completedCourses = [];
    this.#learningPath = [];
  }

  async getStudents() {
    const response = await fetch(baseUrl);
    return response.json();
  }

  async getStudent(username) {
    const students = await this.getStudents();
    const student = students.find((student) => student.username == username);
    if (!student) {
      return { error: "Student not found" };
    }
    return student;
  }

  async createStudent(student) {
    return await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
  }

  async updateStudent(student) {
    return await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
  }

  async deleteStudent(student) {
    return await fetch(`${baseUrl}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: student,
      });
  }

  get id() {
    return this.#id;
  }

  get completedCourses(){
    return this.#completedCourses;
  }

  get learningPath(){
    return this.#learningPath;
  }
}

export default new Student();
