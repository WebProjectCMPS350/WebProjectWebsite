import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";
import adminRepo from "./repository/Administrator.js";
import instructorRepo from "./repository/Instructor.js";


const cardsContainer = document.querySelector("#cards-container");
const search = document.querySelector("#searchInput");

search.addEventListener("keyup", handleSearch);

async function handleSearch(e) {
  
}
