import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";
import adminRepo from "./repository/Administrator.js";
import instructorRepo from "./repository/Instructor.js";

const cardsContainer = document.querySelector("#cards-container");
const userNameWelcoming = document.querySelector("#user-name");
const student = await studentRepo.getStudent(localStorage.username);

document.addEventListener("DOMContentLoaded", loadCourses());

async function loadCourses(e) {
  userNameWelcoming.innerHTML = `Welcome ${student.name}`;

  const courses = await studentRepo.getStudentCourses(student.username);

  const htmlArray = await Promise.all(
    courses.map((course) => templateCourses(course))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");
}

async function templateCourses(course) {
  const classes = await studentRepo.getStudentClasses(student.username);
  const classes2 = student.classes;

  const arr = [];
  for (const clas of classes) {
    if (clas.parentCourse != course.courseNo) {
      continue;
    } else {
      arr.push(clas);
    }
  }

  const registeredClass = arr[0];
  let grade = 0;
  for (const clas of classes2) {
    if (clas.classNo != registeredClass.classNo) {
      continue;
    } else {
      grade = clas.grade;
    }
  }

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
            <p>Status: ${registeredClass.status}</p>
            
        </div>
        <div class="footer" style="color: black">
            <p id="studentsNo">Number of students: ${registeredClass.noOfStudents}</p>
            <p>Instructor: ${registeredClass.instructor} </p>
            <p>Class Time: ${registeredClass.classTime} </p>
            <p>Class Days: ${registeredClass.classDays} </p>
            <p> Grade: ${grade} </p>
        </div>
    </div>
    `;
}
