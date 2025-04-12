import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";
import adminRepo from "./repository/Administrator.js";
import instructorRepo from "./repository/Instructor.js";


const form = document.querySelector(".class-form");
const instructorSelect = document.querySelector("#instructor");
const parentCourse = document.querySelector("#parentCourse");
const message = document.querySelector("#message");


document.addEventListener("DOMContentLoaded", () => {
  loadInstructors();
  loadParentCourses();
});


document.addEventListener("submit", handleNewClassFormSubmit);

async function loadInstructors() {
  noCourseError();

  const instructors = await instructorRepo.getInstructors();
  const htmlArray = instructors.map(
    (instructor) =>
      `<option value="${instructor.name}">${instructor.name}</option>`
  );
  instructorSelect.innerHTML = htmlArray.join("\n");
}

async function loadParentCourses() {
  noCourseError();
  const courses = await courseRepo.getCourses();

  
  const htmlArray = courses.map(
    (course) => `<option value="${course.courseNo}">${course.name}</option>`
  );
  parentCourse.innerHTML = htmlArray.join("\n");
}

async function handleNewClassFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const classesNumsList = (await classRepo.getClasses()).map(
    (clas) => clas.classNo
  );

  if (classesNumsList.includes(parseInt(data.classNo))) {
    message.innerHTML =
      "Class number is already used!, enter a unique class number.";
    message.classList.add("error-message");
    message.classList.remove("success-message");
    setTimeout(() => {
      message.innerHTML = "";
      message.classList.remove("success-message");
      message.classList.remove("error-message");
    }, 3000);
    return;
  } else {
    const clas = {
      classNo: parseInt(data.classNo),
      className: data.className,
      classTime: data.classTime,
      classDays: [data.classDays],
      instructor: data.instructor,
      noOfStudents: 0,
      status: data.status,
      parentCourse: parseInt(data.parentCourse),
    };

    const newClasses = [
      ...(await courseRepo.getCourse(clas.parentCourse)).classes,
      clas.classNo,
    ];
    const newCourse = await courseRepo.getCourse(clas.parentCourse);
    newCourse.classes = newClasses;
    await courseRepo.updateCourse(newCourse);

    await classRepo.createClass(clas);

    message.innerHTML = "Course created successfully!";
    message.classList.add("success-message");
    message.classList.remove("error-message");

    setTimeout(() => {
      message.innerHTML = "";
      message.classList.remove("success-message");
      message.classList.remove("error-message");
      form.reset();
    }, 3000);
  }
}


async function noCourseError() {
  const courses = await courseRepo.getCourses();
  if (courses.length === 0) {    
    message.innerHTML = "Please add a course first!";
    message.classList.add("error-message");
    message.classList.remove("success-message");
    setTimeout(() => {
      message.innerHTML = "";
      message.classList.remove("success-message");
      message.classList.remove("error-message");
    }, 8000);
    return;

  }
}