const coursesURL = 'http://localhost:3000/api/courses';
import course from "./repository/Course.js";

const cardsContainer = document.querySelector("#cards-container");
const search = document.querySelector("#searchInput");

addEventListener("keyup", handleSearch);

async function handleSearch(e) {
  console.log(course.getCourses());
}
