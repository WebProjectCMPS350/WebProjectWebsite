document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".changable-link");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const userType = localStorage.getItem("userType");

      if (userType === "admin") {
        window.location.href = "admin-main-page.html";
        console.log("Admin page loaded");
      } else if (userType === "student") {
        window.location.href = "student-main-page.html";
      } else if (userType === "instructor") {
        window.location.href = "instructor-main-page.html";
      }
    });
  });
});
