const cardsContainer = document.querySelector("#cards-container");
const search = document.querySelector("#searchInput");

addEventListener("keyup", handleSearch);

function handleSearch(e) {
  console.log(e.target.value);
}
