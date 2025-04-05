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

document.addEventListener("DOMContentLoaded", loadCourses);

async function loadCourses(e) {
  const courses = await courseRepo.getCourses();
  const htmlArray = await Promise.all(
    courses.map((course) => templateCourses(course))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");
}

async function templateCourses(course) {
  return `
    <div class="card">
        <p>Name: ${course.name}</p>
        <p>Category: ${course.category}</p>
        <p>Number: ${course.courseNo}</p>
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
