import fse from "fs-extra";
import path from "path";
import classRepo from "./Class.js";
import studentRepo from "./Student.js";
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
        noOfStudents: await this.getClassesNoOfStudents(cla),
      });
    }
    coursesWithClasses.sort((a, b) => b.noOfStudents - a.noOfStudents);
    const top3Courses = coursesWithClasses.slice(0, 3);
    return top3Courses;
  }

  async getClassNoOfFailedStudents(classNo) {
    const clas = await classRepo.getClass(classNo);
    if (!clas) {
      return { error: "Class not found" };
    }
    const students = await studentRepo.getStudentsByClass(classNo);
    let num = 0;
    for (const student of students) {
      for (const clas of student.classes) {
        if (clas.classNo == classNo && clas.grade < 60) {
          num++;
        }
      }
    }
    return num;
  }

  async getClassesNoOfFailedStudents(classes) {
    let num = 0;

    for (const clas of classes) {
      num += await this.getClassNoOfFailedStudents(clas.classNo);
    }

    return num;
  }

  async getFailureRatePerCourse() {
    const courses = await this.getCourses();
    const failureRate = [];

    for (const course of courses) {
      const clas = await this.getCourseClasses(course.courseNo);
      // keep only closed classes
      const closedClasses = clas.filter((c) => c.status == "Closed");
      if (closedClasses.length == 0) {
        continue;
      }
      let num = await this.getClassesNoOfStudents(clas);

      failureRate.push({
        courseName: course.name,
        failureRate: (
          ((await this.getClassesNoOfFailedStudents(clas)) / num) *
          100
        ).toFixed(0),
      });
    }

    failureRate.sort((a, b) => b.failureRate - a.failureRate);
    return failureRate;
  }

  async getAvgClassSizePerCourseCategory() {
    const courses = await this.getCourses();
    const categories = {};

    for (const course of courses) {
      if (!categories[course.category]) {
        categories[course.category] = [];
      }
      categories[course.category].push(course);
    }

    const avgClassSizePerCategory = [];

    for (const category in categories) {
      const classes = await Promise.all(
        categories[category].map((course) =>
          this.getCourseClasses(course.courseNo)
        )
      );
      const totalStudents = await this.getClassesNoOfStudents(classes.flat());
      const avgClassSize = (totalStudents / classes.length).toFixed(0);
      avgClassSizePerCategory.push({ category, avgClassSize });
    }
    avgClassSizePerCategory.sort((a, b) => b.avgClassSize - a.avgClassSize);
    return avgClassSizePerCategory;
  }

  async getAvgClassSizePerCourse() {
    const courses = await this.getCourses();
    const avgClassSizePerCourse = [];

    for (const course of courses) {
      const clas = await this.getCourseClasses(course.courseNo);
      const totalStudents = await this.getClassesNoOfStudents(clas);
      const avgClassSize = (totalStudents / clas.length).toFixed(0);
      avgClassSizePerCourse.push({ courseName: course.name, avgClassSize });
    }
    avgClassSizePerCourse.sort((a, b) => b.avgClassSize - a.avgClassSize);
    return avgClassSizePerCourse;
  }

  async getPassRatePerCourse() {
    const courses = await this.getCourses();
    const passRate = [];

    for (const course of courses) {
      const clas = await this.getCourseClasses(course.courseNo);
      // keep only closed classes
      const closedClasses = clas.filter((c) => c.status == "Closed");
      if (closedClasses.length == 0) {
        continue;
      }

      let num = await this.getClassesNoOfStudents(closedClasses);

      passRate.push({
        courseName: course.name,
        passRate: (
          (((await this.getClassesNoOfStudents(closedClasses)) -
            (await this.getClassesNoOfFailedStudents(closedClasses))) /
            num) *
          100
        ).toFixed(0),
      });
    }

    passRate.sort((a, b) => b.passRate - a.passRate);
    return passRate;
  }
}

export default new Course();
