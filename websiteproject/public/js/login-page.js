import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";
import adminRepo from "./repository/Administrator.js";
import instructorRepo from "./repository/Instructor.js";

const loginForm = document.querySelector("#login-form");
const html = document.querySelector("html");

localStorage.loggedIn = false;
localStorage.userType = null;

loginForm.addEventListener("submit", handleLogin);

async function handleLogin(e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData);

  const students = await studentRepo.getStudents();
  const admins = await adminRepo.getAdministrators();
  const instructors = await instructorRepo.getInstructors();

  for (const student of students) {
    if (
      student.username === data.username &&
      student.password === data.password
    ) {
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
    if (
      instructor.username === data.username &&
      instructor.password === data.password
    ) {
      loadInstructorMainPage(instructor);
      return;
    }
  }

  const err = document.querySelector("#error-message");
  err.innerHTML = `Invalid username or password`;
}

async function loadStudentMainPage(student) {
  localStorage.loggedIn = true;
  localStorage.userType = "student";
  localStorage.username = student.username;
  window.location.href = "/student-main-page.html";
}

async function loadInstructorMainPage(instructor) {
  localStorage.loggedIn = true;
  localStorage.userType = "instructor";
  localStorage.username = instructor.username;
  window.location.href = "/instructor-main-page.html";
}

async function loadAdminMainPage(admin) {
  localStorage.loggedIn = true;
  localStorage.userType = "admin";
  localStorage.username = admin.username;
  window.location.href = "/admin-main-page.html";
}
