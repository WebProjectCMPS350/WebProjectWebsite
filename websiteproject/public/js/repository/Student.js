const baseUrl = "/api/students";
import courseRepo from "./Course.js";
import classRepo from "./Class.js";
import studentRepo from "./Student.js";
class Student {
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

  async getStudentsByClass(classNo) {
    const students = await this.getStudents();
    const studentsInClass = students.filter((student) =>
      student.classes.some((classItem) => classItem.classNo == classNo)
    );
    return studentsInClass;
  }
}

export default new Student();
