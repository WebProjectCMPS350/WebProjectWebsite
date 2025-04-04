import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";
import adminRepo from "./repository/Administrator.js";
import instructorRepo from "./repository/Instructor.js";

const cardsContainer = document.querySelector("#cards-container");
const search = document.querySelector("#searchInput");

search.addEventListener("keyup", handleSearch);

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
        <h1>${course.name}</h1>
        <h1>${course.category}</h1>
        <h1>${course.courseNo}</h1>
    </div>
    `;
}
// search by name
async function handleSearch() {
  let courses = await courseRepo.getCourses();
  courses = courses.filter(course => course.name.toUpperCase().includes(search.value.toUpperCase()) );
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
