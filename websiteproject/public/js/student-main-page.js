import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";
import adminRepo from "./repository/Administrator.js";
import instructorRepo from "./repository/Instructor.js";

const cardsContainer = document.querySelector("#cards-container");
const search = document.querySelector("#searchInput");
const typeOfSearch = document.querySelector("#typeOfSearch");



search.addEventListener("keyup", handleSearch);
typeOfSearch.addEventListener("change", type);

const student = await studentRepo.getStudent(localStorage.username);


document.addEventListener("DOMContentLoaded", loadCourses);
loadCourses();
async function loadCourses(e) {
  const courses = await courseRepo.getCourses();
  const htmlArray = await Promise.all(
    courses.map((course) => templateCourses(course))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");
  console.log(htmlArray.join("\n"));
  
}

async function templateCourses(course) {
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
            <button class="enroll-btn">Enroll</button>
        </div>
    </div>
    `;
}

async function type() {
  handleSearch();
}

// search by name
async function handleSearch() {
  let selectedValue = typeOfSearch.value;

  let courses = await courseRepo.getCourses();
  if (selectedValue == "By name") {
    courses = courses.filter((course) =>
      course.name.toUpperCase().includes(search.value.toUpperCase())
    );
  } else {
    courses = courses.filter((course) =>
      course.category.toUpperCase().includes(search.value.toUpperCase())
    );
  }

  const htmlArray = await Promise.all(
    courses.map((course) => templateCourses(course))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");
}

/*

    <div class="card">
        <h1>Hello</h1>
    </div>

*/
