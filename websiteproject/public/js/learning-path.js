import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";
import adminRepo from "./repository/Administrator.js";
import instructorRepo from "./repository/Instructor.js";

const cardsContainer = document.querySelector("#cards-container");
const userNameWelcoming = document.querySelector("#user-name");
const student = await studentRepo.getStudent(localStorage.username);

document.addEventListener("DOMContentLoaded", loadCourses());
const classes = await studentRepo.getStudentClasses(student.username);

async function loadCourses(e) {
  userNameWelcoming.innerHTML = `Welcome ${student.name}`;

  const courses = await studentRepo.getStudentCourses(student.username);

  const htmlArray = await Promise.all(
    courses.map((course) => templateCourses(course))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");
}

async function templateCourses(course) {
  const registeredClass = await classRepo.getRegisteredClass(
    course.courseNo,
    classes
  );

  student.classes.forEach((classItem) => {
    if (classItem.classNo == registeredClass.classNo) {
      registeredClass.grade = classItem.grade;
    }
  });

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
            <h3>Class Information</h3>
            <p id="classNo">Class No: ${registeredClass.classNo}</p>
            <p id="studentsNo">Number of students: ${registeredClass.noOfStudents}</p>
            <p>Instructor: ${registeredClass.instructor} </p>
            <p>Class Time: ${registeredClass.classTime} </p>
            <p>Class Days: ${registeredClass.classDays} </p>
            <p> Grade: ${registeredClass.grade} </p>
        </div>
    </div>
    `;
}
