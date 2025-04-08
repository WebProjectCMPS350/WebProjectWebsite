import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";
import adminRepo from "./repository/Administrator.js";
import instructorRepo from "./repository/Instructor.js";

const loginForm = document.querySelector("#login-form");
const html = document.querySelector("html");

loginForm.addEventListener("submit", handleLogin);

async function handleLogin(e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData);

  const students = await studentRepo.getStudents();
  const admins = await adminRepo.getAdministrators();
  const instructors = await instructorRepo.getInstructors(); 

  for (const student of students) {
    if (student.username === data.username && student.password === data.password) {
      loadStudentMainPage(student);
      return;
    }
  }
  for (const admin of admins) {
    if (admin.username === data.username && admin.password === data.password) {
      loadAdminMainPage(admin);
      return;
    }
  }
  for (const instructor of instructors) {
    if (instructor.username === data.username && instructor.password === data.password) {
      loadInstructorMainPage(instructor);
      return;
    }
  }
}

async function loadStudentMainPage(student) {
  
  html.innerHTML = `
    <h1>Welcome, ${student.username}</h1>
    <p>Your courses:</p>
    <ul id="courses-list"></ul>
  `;
  
}
