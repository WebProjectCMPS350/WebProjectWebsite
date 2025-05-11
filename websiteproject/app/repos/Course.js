import fse from "fs-extra";
import path from "path";
import classRepo from "./Class.js";
import { log } from "console";
class Course {
  constructor() {
    this.coursesFilePath = path.join(process.cwd(), "app/data/courses.json"); //
  }

  async saveCourses(courses) {
    await fse.writeJson(this.coursesFilePath, courses);
  }

  async getCourses() {
    const courses = await fse.readJson(this.coursesFilePath);
    return courses;
  }

  async getCoursesByName(name) {
    const courses = await this.getCourses();
    return courses.filter((course) =>
      course.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async getCoursesByCategory(category) {
    const courses = await this.getCourses();
    const filteredCourses = courses.filter((course) =>
      course.category.toLowerCase().includes(category.toLowerCase())
    );
    console.log(filteredCourses);

    return filteredCourses;
  }

  async getCourse(courseNo) {
    const courses = await this.getCourses();
    const course = courses.find((course) => course.courseNo == courseNo);
    if (!course) {
      return { error: "Course not found" };
    }
    return course;
  }

  async createCourse(course) {
    const courses = await this.getCourses();
    courses.push(course);
    await this.saveCourses(courses);
    return course;
  }

  async updateCourse(courseNo, course) {
    const courses = await this.getCourses();

    const index = courses.findIndex((course) => course.courseNo == courseNo);

    if (index < 0) {
      return { error: "course not found" };
    }
    courses[index] = { ...courses[index], ...course };

    await this.saveCourses(courses);
    return courses[index];
  }

  async deleteCourse(courseNo) {
    const courses = await this.getCourses();
    const index = courses.findIndex((course) => course.courseNo == courseNo);
    if (index < 0) {
      return { error: "course not found" };
    }
    courses.splice(index, 1);
    await this.saveCourses(courses);
    return { message: "course deleted successfully" };
  }

  async getCourseClasses(courseNo) {
    const course = await this.getCourse(courseNo);

    const classPromises = course.classes.map((classNo) =>
      classRepo.getClass(classNo)
    );

    const classes = await Promise.all(classPromises);
    return classes;
  }

  async getCourseByName(name) {
    const courses = await this.getCourses();
    return courses.filter((course) =>
      course.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async getCoursesByCategory(category) {
    const courses = await this.getCourses();
    return courses.filter((course) =>
      course.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  async getTotalCourses() {
    const courses = await this.getCourses();
    return courses.length;
  }

  async getClassNoOfStudents(classNo) {
    const clas = await classRepo.getClass(classNo);
    if (!clas) {
      return { error: "Class not found" };
    }
    return clas.noOfStudents;
  }

  async getClassesNoOfStudents(classes) {
    let num = 0;

    for (const clas of classes) {
      num += clas.noOfStudents;
    }

    return num;
  }

  async getTop3Courses() {
    const courses = await this.getCourses();

    const coursesWithClasses = [];
    for (const course of courses) {
      const cla = await this.getCourseClasses(course.courseNo);

      coursesWithClasses.push({
        courseName: course.name,
        classes: await this.getClassesNoOfStudents(cla),
      });
    }
    coursesWithClasses.sort((a, b) => b.classes - a.classes);
    const top3Courses = coursesWithClasses.slice(0, 3);

    return top3Courses.map((course) => course.courseName);
  }
}

export default new Course();
