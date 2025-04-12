import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";
import adminRepo from "./repository/Administrator.js";
import instructorRepo from "./repository/Instructor.js";

const validateGradesForm = document.querySelector("#validate-grades-form");
const clas = JSON.parse(localStorage.clas);

document.addEventListener("DOMContentLoaded", loadGrades);

async function loadGrades() {
  const students = await studentRepo.getStudentsByClass(clas.classNo);
  const htmlArray = await Promise.all(
    students.map((student) => templateStudent(student))
  );

  validateGradesForm.innerHTML =
    htmlArray.join("\n") +
    `
    <button type="submit" class="btn">Submit All Grades</button>
  `;

  const submitBtn = document.querySelector(".btn");
  const message = document.querySelector("#message");

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const studentElements = document.querySelectorAll(".student");

    for (const studentEl of studentElements) {
      const username = studentEl.querySelector(".studentName label").id;
      const grade = studentEl.querySelector(".grade-input").value;

      if (grade === "") continue;

      const student = await studentRepo.getStudent(username);
      const classIndex = await getClassIndex(student);

      student.classes[classIndex].grade = parseInt(grade);
      await studentRepo.updateStudent(student);
    }

    clas.status = "Closed";
    await classRepo.updateClass(clas);

    message.textContent = "All grades submitted and class is now closed!";
    setTimeout(() => (message.textContent = ""), 3000);

    window.location.href = "instructor-main-page.html";
  });
}

function templateStudent(student) {
  return `
    <div class="student">
      <div class="studentName">
        <label id="${student.username}">Student name:</label>
        <label>${student.name},</label>
      </div>

      <label for="grade">Grade:</label>
      <input type="number" class="grade-input" min="0" max="100" required>
    </div>
  `;
}

async function getClassIndex(student) {
  return student.classes.findIndex((c) => c.classNo == clas.classNo);
}
