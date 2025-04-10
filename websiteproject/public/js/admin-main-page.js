import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";
import adminRepo from "./repository/Administrator.js";
import instructorRepo from "./repository/Instructor.js";

const cardsContainer = document.querySelector("#cards-container");
const search = document.querySelector("#searchInput");
const typeOfSearch = document.querySelector("#typeOfSearch");
const student = await studentRepo.getStudent(localStorage.username);

search.addEventListener("keyup", handleSearch);
typeOfSearch.addEventListener("change", type);

document.addEventListener("DOMContentLoaded", loadCourses());

async function loadCourses(e) {
  const courses = await courseRepo.getCourses();
  const htmlArray = await Promise.all(
    courses.map((course) => templateCourses(course))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");
}

async function templateCourses(course) {
  // this is wrong, it need to be changed
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
               <p id="studentsNo">Number of students: </p>
            <p>Instructor: </p>
            <p> Grade:  </p>
        </div>
        <div class="footer" style="color: black">
         <button class="admin-btn admin-btn-approve">Approve</button>
         <button class="admin-btn admin-btn-cancel">Cancel</button>
        </div>
    </div>
    `;
}

async function type() {
  handleSearch();
}

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

