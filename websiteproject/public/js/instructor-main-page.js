import classRepo from "./repository/Class.js";
import courseRepo from "./repository/Course.js";
import instructorRepo from "./repository/Instructor.js";

const cardsContainer = document.querySelector("#cards-container");
const search = document.querySelector("#searchInput");
const typeOfSearch = document.querySelector("#typeOfSearch");

document.addEventListener("DOMContentLoaded", loadClasses);
search.addEventListener("keyup", handleSearch);
typeOfSearch.addEventListener("change", handleSearch);

async function loadClasses() {
  const instructor = await instructorRepo.getInstructor(localStorage.username);

  const intialClasses = await classRepo.getClassesByInstructorName(
    instructor.name
  );
  const classes = intialClasses.filter((clas) => clas.status !== "Closed");
  const htmlArray = await Promise.all(
    classes.map((clas) => templateClass(clas))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");

  const validateVtnBtn = document.querySelectorAll(".validate-btn");

  validateVtnBtn.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const card = btn.closest(".card");
      const classNo = card.querySelector(".number").textContent.split(": ")[1];
      const clas = await classRepo.getClass(classNo);
      localStorage.clas = JSON.stringify(clas);

      window.location.href = "validate-grades-page.html";
    });
  });
}
const allCourses = await courseRepo.getCourses();
const courseMap = new Map();
for (const course of allCourses) courseMap.set(course.courseNo, course);

async function templateClass(clas) {
  const course = await courseMap.get(clas.parentCourse);
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
            <p class="number">Class Number: ${clas.classNo}</p>
            <p>Status: ${clas.status}</p>
               <p id="studentsNo">Number of students: ${clas.noOfStudents} </p>
            <p>Instructor: ${clas.instructor}</p>
            <p>Class Time: ${clas.classTime}</p>
            <p>Class Days: ${clas.classDays}</p>
        </div>
        <div class="footer" style="color: black">
        <div class="card-btns"> 
        <button class="validate-btn"> Validate Grades</button>
         </div>
         <p class="message"> </p> 
        </div>
    </div>
    `;
}

async function handleSearch() {
  const instructor = await instructorRepo.getInstructor(localStorage.username);

  let selectedValue = typeOfSearch.value;

  const intialClasses = await classRepo.getClassesByInstructorName(
    instructor.name
  );
  let classes = intialClasses.filter((clas) => clas.status !== "Closed");
  if (selectedValue == "By name") {
    classes = classes.filter((clas) =>
      clas.className.toUpperCase().includes(search.value.toUpperCase())
    );
  } else {
    const filterResults = await Promise.all(
      classes.map(async (clas) => {
        const course = await classRepo.getParentCourse(clas.classNo);
        const matches = course.category
          .toUpperCase()
          .includes(search.value.toUpperCase());
        return matches ? clas : null;
      })
    );

    classes = filterResults.filter((element) => element !== null);
  }

  const htmlArray = await Promise.all(
    classes.map((clas) => templateClass(clas))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");
}
