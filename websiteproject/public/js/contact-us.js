const submit = document.querySelector("#submit");
const successMessage = document.querySelector("#success-message");
const form = document.querySelector(".contact-form");
submit.addEventListener("submit", async (e) => {
  e.preventDefault();
  //alert("Your message has been sent successfully!");
  successMessage.textContent = "Your message has been sent successfully!";
  successMessage.style.color = "green";
  setTimeout(() => {
    successMessage.textContent = "";
  }, 3000);
  form.reset();
});

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
