// Done

import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";

const cardsContainer = document.querySelector("#cards-container");
const search = document.querySelector("#searchInput");
const typeOfSearch = document.querySelector("#typeOfSearch");
const student = await studentRepo.getStudent(localStorage.username);

search.addEventListener("keyup", handleSearch);
typeOfSearch.addEventListener("change", handleSearch);

document.addEventListener("DOMContentLoaded", loadCourses());

const allClasses = await classRepo.getClasses();
const classMap = new Map();
for (const clas of allClasses) classMap.set(clas.classNo, clas);

async function loadCourses() {
  const courses = await courseRepo.getCourses();
  const htmlArray = await Promise.all(
    courses.map((course) => templateCourses(course))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");

  handleSelectChange();
  handleEnrollment();
}

async function templateCourses(course) {
  const classes = await courseRepo.getCourseClasses(course.courseNo);

  return `
    <div class="card">
        <div class="header">
            <h2 class="title">${course.name}</h2>
            <span class="category">Category: ${course.category}</span>
        </div>
        <div class="body">
            <p class="desc">${course.description}</p>
            <p class="number">Course No: ${course.courseNo}</p>
            <p>Coure Status: ${course.status}</p>
            <p id="ClassStatus">Class Status: </p>
            <p id="studentsNo">Number of students: </p>
            <p id="classTime">Class Time: </p>
            <p id="classDays">Class Days: </p>
        </div>
        <div class="footer">
            <select class="classSelect">
                <option value="">Select instructor</option>
                ${classes
                  .map(
                    (classItem) =>
                      `<option value="${classItem.instructor}-${classItem.classNo}">${classItem.instructor}</option>`
                  )
                  .join("")}
            </select>
            <button class="enroll-btn">Enroll</button>
            <p class="error-message"> </p>
            <p class="approved-message"> </p>
        </div>
    </div>
  `;
}

function handleSelectChange() {
  const selects = document.querySelectorAll(".classSelect");

  selects.forEach((select) => {
    select.addEventListener("change", (e) => {
      const card = select.closest(".card");
      const classNo = parseInt(e.target.value.split("-")[1]);
      const classItem = classMap.get(classNo);

      const studentsNo = card.querySelector("#studentsNo");
      const classTime = card.querySelector("#classTime");
      const classDays = card.querySelector("#classDays");
      const classStatus = card.querySelector("#ClassStatus");

      if (classItem) {
        studentsNo.innerHTML = `Number of students: ${classItem.noOfStudents}`;
        classTime.innerHTML = `Class Time: ${classItem.classTime}`;
        classDays.innerHTML = `Class Days: ${classItem.classDays}`;
        classStatus.innerHTML = `Class Status: ${classItem.status}`;
      } else {
        studentsNo.innerHTML = "Number of students: ";
        classTime.innerHTML = "Class Time: ";
        classDays.innerHTML = "Class Days: ";
        classStatus.innerHTML = "Class Status: ";
      }
    });
  });
}

function handleEnrollment() {
  const enroll = document.querySelectorAll(".enroll-btn");
  enroll.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const card = btn.closest(".card");
      const select = card.querySelector(".classSelect");
      const selectedValue = select.value;
      const classNo = parseInt(selectedValue.split("-")[1]);
      const clas = classMap.get(classNo);
      const parentCourse = await courseRepo.getCourse(clas.parentCourse);

      const errorMessage = card.querySelector(".error-message");
      const approveMessage = card.querySelector(".approved-message");

      if (clas.noOfStudents >= 30) {
        errorMessage.innerHTML = "Class is full";
        setTimeout(() => (errorMessage.innerHTML = ""), 3000);
        return;
      }

      if (clas.status.toUpperCase() !== "OPEN") {
        errorMessage.innerHTML = "Class is not open for enrollment";
        setTimeout(() => (errorMessage.innerHTML = ""), 3000);
        return;
      }

      for (let c of student.classes) {
        const existingClass = classMap.get(c.classNo);

        if (existingClass.parentCourse === parentCourse.courseNo) {
          if (c.grade >= 60) {
            errorMessage.innerHTML = "You already passed this course";
            setTimeout(() => (errorMessage.innerHTML = ""), 3000);
            return;
          }
          if (c.grade == null) {
            errorMessage.innerHTML = "You already registered in this course";
            setTimeout(() => (errorMessage.innerHTML = ""), 3000);
            return;
          }
        }
      }

      const completedClasses = new Set(
        student.classes.map((cls) => cls.classNo)
      );
      const hasPrereqs = parentCourse.prerequisites.every((p) =>
        completedClasses.has(p)
      );

      if (!hasPrereqs) {
        errorMessage.innerHTML = "You have to pass the prerequisites first";
        setTimeout(() => (errorMessage.innerHTML = ""), 3000);
        return;
      }

      student.classes.push({ classNo, grade: null });
      clas.noOfStudents++;
      await studentRepo.updateStudent(student);
      await classRepo.updateClass(clas);

      approveMessage.innerHTML = "You have been enrolled successfully";
      setTimeout(() => (approveMessage.innerHTML = ""), 3000);
    });
  });
}

async function handleSearch() {
  const selectedValue = typeOfSearch.value;
  let courses =
    selectedValue === "By name"
      ? await courseRepo.getCoursesByName(search.value)
      : await courseRepo.getCoursesByCategory(search.value);

  const htmlArray = await Promise.all(
    courses.map((course) => templateCourses(course))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");
  handleSelectChange();
  handleEnrollment();
}
