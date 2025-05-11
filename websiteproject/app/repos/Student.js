import fse from "fs-extra";
import path from "path";
import courseRepo from "./Course.js";
class Student {
  constructor() {
    this.studentsFilePath = path.join(process.cwd(), "app/data/students.json"); //
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
    const student = students.find((student) => student.username == username);
    if (!student) {
      return { error: "Student not found" };
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

    const index = students.findIndex((student) => student.username == username);

    if (index < 0) {
      return { error: "Student not found" };
    }
    students[index] = { ...students[index], ...student };

    await this.saveStudents(students);
    return students[index];
  }

  async deleteStudent(username) {
    const students = await this.getStudents();
    const index = students.findIndex((student) => student.username == username);
    if (index < 0) {
      return { error: "Student not found" };
    }
    students.splice(index, 1);
    await this.saveStudents(students);
    return { message: "Student deleted successfully" };
  }

  async getTotalStudents() {
    const students = await this.getStudents();
    return students.length;
  }

  async getTotalStudentsPerCourse() {
    const students = await this.getStudents();
    const courses = await courseRepo.getCourses();
    return Math.floor(students.length / courses.length);
  }

  async getStudentAverageGrade(student) {
    const grades = student.classes
      .map((c) => c.grade)
      .filter((grade) => grade !== null && grade !== undefined);

    if (grades.length === 0) return null;

    const total = grades.reduce((sum, grade) => sum + grade, 0);

    return total / grades.length;
  }

  async getStudentsAverageGrade() {
    const students = await this.getStudents();
    let grades = 0;
    let n = 0;

    for (const student of students) {
      const average = await this.getStudentAverageGrade(student);
      if (average !== null) {
        grades += average;
        n++;
      }
    }
    return (grades / n).toFixed(2);
  }

  async getStudentsAverageGPA() {
    const students = await this.getStudents();
    let gpa = 0;
    let n = 0;

    for (const student of students) {
      const average = await this.getStudentAverageGrade(student);
      if (average !== null) {
        gpa += average / 20;
        n++;
      }
    }
    return (gpa / n).toFixed(2);
  }
}

export default new Student();
