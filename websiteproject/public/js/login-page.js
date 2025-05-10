// Done
import generalRepo from "./repository/General.js";

const loginForm = document.querySelector("#login-form");

localStorage.loggedIn = false;
localStorage.userType = null;
localStorage.username = null;
localStorage.clas = null;

loginForm.addEventListener("submit", handleLogin);

async function handleLogin(e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData);

  const answer = await generalRepo.handleLoginPage(
    data.username,
    data.password
  );

  if (answer.role === null) {
    const err = document.querySelector("#error-message");
    err.innerHTML = `Invalid username or password`;
    setTimeout(() => {
      err.innerHTML = "";
    }, 3000);
    return;
  } else if (answer.role === "Student") {
    loadStudentMainPage(answer.obj);
    return;
  } else if (answer.role === "Instructor") {
    loadInstructorMainPage(answer.obj);
    return;
  } else if (answer.role === "Admin") {
    console.log(answer);
    loadAdminMainPage(answer.obj);

    return;
  }
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
