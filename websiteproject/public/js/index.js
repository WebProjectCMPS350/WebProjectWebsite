import courseRepo from "./repository/Course.js";

//const c = new course();
const cardsContainer = document.querySelector("#cards-container");
const search = document.querySelector("#searchInput");

search.addEventListener("keyup", handleSearch);

async function handleSearch(e) {
  console.log(await courseRepo.getCoursesByName("Database"));
}
