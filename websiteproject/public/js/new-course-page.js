import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";
import adminRepo from "./repository/Administrator.js";
import instructorRepo from "./repository/Instructor.js";

const form = document.querySelector(".course-form");
const prerequisitesCheckboxs = document.querySelector(".checkbox-group");
const message = document.querySelector("#message");

document.addEventListener("submit", handleNewCourseFormSubmit);
document.addEventListener("DOMContentLoaded", loadPrerequisites);

async function loadPrerequisites() {
  const courses = await courseRepo.getCourses();
  const htmlArray = courses.map(
    (course) => `
    <label for=""><input type="checkbox" id="prerequisites" name="prerequisites" value="${course.courseNo}">${course.name}</label>
                                
                            `
  );
  prerequisitesCheckboxs.innerHTML = htmlArray.join("\n");
}

async function handleNewCourseFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const selectedPrerequisites = Array.from(
    document.querySelectorAll('input[name="prerequisites"]:checked')
  ).map((checkbox) => parseInt(checkbox.value));

  const coursesNumsList = (await courseRepo.getCourses()).map(
    (course) => course.courseNo
  );
  if (coursesNumsList.includes(parseInt(data.courseNo))) {
    message.innerHTML =
      "Course number is already used!, enter a unique course number.";
    message.classList.add("error-message");
    message.classList.remove("success-message");
    setTimeout(() => {
      message.innerHTML = "";
      message.classList.remove("success-message");
      message.classList.remove("error-message");
    }, 3000);
    return;
  } else {
    const course = {
      courseNo: parseInt(data.courseNo),
      name: data.courseName,
      description: data.description,
      category: data.category,
      status: data.status,
      prerequisites: selectedPrerequisites,
      classes: [],
    };

    await courseRepo.createCourse(course);

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
