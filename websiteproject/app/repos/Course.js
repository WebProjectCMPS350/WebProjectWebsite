import fse from "fs-extra";
import path from "path";
import classRepo from "./Class.js";
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
    const courses = await fse.readJson(this.coursesFilePath);
    return courses.filter(
      (course) => course.name.toLowerCase() == name.toLowerCase()
    );
  }

  async getCoursesByCategory(category) {
    const courses = await fse.readJson(this.coursesFilePath);
    return courses.filter(
      (course) => course.category.toLowerCase() == category.toLowerCase()
    );
  }

  async getCourse(courseNo) {
    const courses = await this.getCourses();
    const course = courses.find((course) => course.courseNo == courseNo);
    if (!course) {
      return { error: "Account not found" };
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
    const classes = [];
    const course = await this.getCourse(courseNo);

    for (const classNo of course.classes) {
      const classObj = await classRepo.getClass(classNo);
      classes.push(classObj);
    }

    return classes;
  }
}

export default new Course();
