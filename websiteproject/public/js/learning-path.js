import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";
import adminRepo from "./repository/Administrator.js";
import instructorRepo from "./repository/Instructor.js";

const cardsContainer = document.querySelector("#cards-container");

document.addEventListener("DOMContentLoaded", loadMyLearningPath);

async function loadMyLearningPath(e) {
    const student = await studentRepo.getStudent("Mohammed");
    const htmlArray = await Promise.all(
        student.learningPath.map((course) => templateCourses(course))
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