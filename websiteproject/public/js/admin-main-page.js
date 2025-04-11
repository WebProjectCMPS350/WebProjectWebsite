import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";
import adminRepo from "./repository/Administrator.js";
import instructorRepo from "./repository/Instructor.js";

const cardsContainer = document.querySelector("#cards-container");
const search = document.querySelector("#searchInput");
const typeOfSearch = document.querySelector("#typeOfSearch");
const coursesBtn = document.querySelector(".courses");
const classesBtn = document.querySelector(".classes");
const statusSelect = document.querySelector("#status");
const categorySelect = document.querySelector("#category");

statusSelect.addEventListener("change", () => searchClassesAndCourses());
categorySelect.addEventListener("change", () => searchClassesAndCourses());

const admin = await adminRepo.getAdministrator(localStorage.username);
let currentClasses = [];
let currentCourses = [];

search.addEventListener("keyup", type);
typeOfSearch.addEventListener("change", type);
coursesBtn.addEventListener("click", handleCoursesFilter);
classesBtn.addEventListener("click", handleClassesFilter);
document.addEventListener("DOMContentLoaded", loadClasses());

async function loadClasses(e) {
  const courses = await courseRepo.getCourses();
  const categories = new Set(courses.map((course) => course.category));
  const htmlArray = Array.from(categories).map(
    (category) => `<option value="${category}">${category}</option>`
  );
  categorySelect.innerHTML =
    `<option value="">All</option>` + htmlArray.join("\n");
  if (
    localStorage.defaultPage == "classes" ||
    localStorage.defaultPage == undefined
  ) {
    handleClassesFilter();
  } else {
    handleCoursesFilter();
  }
}

async function templateClass(clas) {
  const course = await classRepo.getParentCourse(clas.classNo);
  return `
    
    <div class="card">
        <div class="header">
            <h2 class="title">${clas.className}</h2>
            <span class="category">Category: ${course.category}</span>
        </div>
        <div class="body">
            <p class="desc">
                ${course.description}
            </p>
            <p class="number">Course No: ${clas.classNo}</p>
            <p>Status: ${clas.status}</p>
               <p id="studentsNo">Number of students: ${clas.noOfStudents} </p>
            <p>Instructor: ${clas.instructor}</p>
        </div>
        <div class="footer" style="color: black">
         <button class="admin-btn admin-btn-approve">Approve</button>
         <button class="admin-btn admin-btn-cancel">Cancel</button>
        </div>
    </div>
    `;
}

async function type() {
  if (
    localStorage.defaultPage == "classes" ||
    localStorage.defaultPage == undefined
  ) {
    handleSearchOfClasses();
  } else {
    handleSearchOfCourses();
  }
}

async function searchClassesAndCourses() {
  if (
    localStorage.defaultPage == "classes" ||
    localStorage.defaultPage == undefined
  ) {
    await handleSearchOfClasses();
  } else {
    await handleSearchOfCourses();
  }
}

async function handleSearchOfClasses() {
  let selectedValue = typeOfSearch.value;
  const statusValue = statusSelect.value;

  let classes = await classRepo.getClasses();
  currentClasses = [...classes];

  if (selectedValue == "By name") {
    currentClasses = currentClasses.filter((clas) =>
      clas.className.toUpperCase().includes(search.value.toUpperCase())
    );
  } else {
    const filterResults = await Promise.all(
      currentClasses.map(async (clas) => {
        const course = await classRepo.getParentCourse(clas.classNo);
        const matches = course.category
          .toUpperCase()
          .includes(search.value.toUpperCase());
        return matches ? clas : null;
      })
    );

    currentClasses = filterResults.filter((element) => element !== null);
  }

  if (statusValue && statusValue.toUpperCase() !== "ALL") {
    currentClasses = currentClasses.filter(
      (clas) => clas.status.toUpperCase() === statusValue.toUpperCase()
    );
  }

  if (categorySelect.value && categorySelect.value.toUpperCase() !== "ALL") {
    const filterResults = await Promise.all(
      currentClasses.map(async (clas) => {
        const course = await classRepo.getParentCourse(clas.classNo);
        const matches = course.category
          .toUpperCase()
          .includes(categorySelect.value.toUpperCase());
        return matches ? clas : null;
      })
    );

    currentClasses = filterResults.filter((element) => element !== null);
  }

  const htmlArray = await Promise.all(
    currentClasses.map((clas) => templateClass(clas))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");
  setupActionButtons();
}

async function handleSearchOfCourses() {
  let selectedValue = typeOfSearch.value;
  const statusValue = statusSelect.value;

  let courses = await courseRepo.getCourses();
  currentCourses = [...courses];
  if (selectedValue == "By name") {
    currentCourses = currentCourses.filter((course) =>
      course.name.toUpperCase().includes(search.value.toUpperCase())
    );
  } else {
    currentCourses = currentCourses.filter((course) =>
      course.category.toUpperCase().includes(search.value.toUpperCase())
    );
  }

  if (statusValue && statusValue.toUpperCase() !== "ALL") {
    currentCourses = currentCourses.filter(
      (clas) => clas.status.toUpperCase() === statusValue.toUpperCase()
    );
  }

  if (categorySelect.value && categorySelect.value.toUpperCase() !== "ALL") {
    currentCourses = await Promise.all(
      currentCourses.filter((course) => {
        return course.category
          .toUpperCase()
          .includes(categorySelect.value.toUpperCase());
      })
    );
  }

  const htmlArray = await Promise.all(
    currentCourses.map((course) => templateCourses(course))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");

  setupActionButtons();
}

async function handleCoursesFilter() {
  document.querySelector(".courses").classList.add("btn-clicked");
  document.querySelector(".classes").classList.remove("btn-clicked");
  localStorage.defaultPage = "courses";
  const courses = await courseRepo.getCourses();
  const htmlArray = await Promise.all(
    courses.map((course) => templateCourses(course))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");

  setupActionButtons();
}

async function handleClassesFilter() {
  document.querySelector(".classes").classList.add("btn-clicked");
  document.querySelector(".courses").classList.remove("btn-clicked");

  localStorage.defaultPage = "classes";
  const classes = await classRepo.getClasses();
  const htmlArray = await Promise.all(
    classes.map((clas) => templateClass(clas))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");

  setupActionButtons();
}

async function templateCourses(course) {
  const classes = await Promise.all(
    course.classes.map((classItem) => classRepo.getClass(classItem))
  );

  return `
    
    <div class="card">
        <div class="header">
            <h2 class="title">${course.name}</h2>
            <span class="category">Category: ${course.category}</span>
        </div>
        <div class="body">
            <p class="desc">
                ${course.description}
            </p>
            <p class="number">Course No: ${course.courseNo}</p>
            <p>Status: ${course.status}</p>
        </div>
        <div class="footer">
            <button class="admin-btn admin-btn-approve">Approve</button>
         <button class="admin-btn admin-btn-cancel">Cancel</button>
        </div>
    </div>
    `;
}

function setupActionButtons() {
  const approveButtons = document.querySelectorAll(".admin-btn-approve");
  const cancelButtons = document.querySelectorAll(".admin-btn-cancel");

  approveButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log("Approve clicked");
    });
  });

  cancelButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      
      console.log("Cancel clicked");
    });
  });
}
