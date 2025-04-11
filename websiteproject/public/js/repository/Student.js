const baseUrl = "/api/students";
import User from "./User.js";
import courseRepo from "./Course.js";
import classRepo from "./Class.js";
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
      body: JSON.stringify(student),
    });
  }

  async getStudentClasses(username) {
    const student = await this.getStudent(username);
    if (student.error) return;
    {
      error: "Student not found";
    }
    const classes = await Promise.all(
      student.classes.map((classItem) => classRepo.getClass(classItem.classNo))
    );
    return classes;
  }

  async getStudentCourses(username) {
    const student = await this.getStudent(username);
    if (student.error) return;
    {
      error: "Student not found";
    }
    const classes = await this.getStudentClasses(username);
    const courses = await Promise.all(
      classes.map((classItem) => courseRepo.getCourse(classItem.parentCourse))
    );
    return courses;
  }

  get id() {
    return this.#id;
  }

  get completedCourses() {
    return this.#completedCourses;
  }

  get learningPath() {
    return this.#learningPath;
  }
}

export default new Student();
