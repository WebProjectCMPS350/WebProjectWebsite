import courseRepo from "./repository/Course.js";
import classRepo from "./repository/Class.js";
import studentRepo from "./repository/Student.js";
import adminRepo from "./repository/Administrator.js";
import instructorRepo from "./repository/Instructor.js";

const cardsContainer = document.querySelector("#cards-container");
const search = document.querySelector("#searchInput");
const typeOfSearch = document.querySelector("#typeOfSearch");
const student = await studentRepo.getStudent(localStorage.username);

search.addEventListener("keyup", handleSearch);
typeOfSearch.addEventListener("change", type);

document.addEventListener("DOMContentLoaded", loadCourses());

async function loadCourses(e) {
  const courses = await courseRepo.getCourses();
  const htmlArray = await Promise.all(
    courses.map((course) => templateCourses(course))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");

  const selects = document.querySelectorAll(".classSelect");

  selects.forEach((select) => {
    select.addEventListener("change", async (e) => {
      const card = select.closest(".card");

      const studentsNo = card.querySelector("#studentsNo");
      const classTime = card.querySelector("#classTime");
      const classDays = card.querySelector("#classDays");

      if (e.target.value) {
        const classNo = parseInt(e.target.value.split("-")[1]);

        const classItem = await classRepo.getClass(classNo);

        studentsNo.innerHTML = `Number of students: ${classItem.noOfStudents}`;
        classTime.innerHTML = `Class Time: ${classItem.classTime}`;
        classDays.innerHTML = `Class Days: ${classItem.classDays}`;
      } else {
        studentsNo.innerHTML = "Number of students: ";
        classTime.innerHTML = "Class Time: ";
        classDays.innerHTML = "Class Days: ";
      }
    });
  });

  const enroll = document.querySelectorAll(".enroll-btn");
  enroll.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const card = btn.closest(".card");
      const select = card.querySelector(".classSelect");
      const selectedValue = select.value;
      const classNo = parseInt(selectedValue.split("-")[1]);
      const clas = await classRepo.getClass(classNo);
      const parentCourse = await courseRepo.getCourse(clas.parentCourse);
      const errorMessage = card.querySelector(".error-message");
      const approveMessage = card.querySelector(".approved-message");
      // Did the student passed the course

      if (clas.noOfStudents >= 30) {
        errorMessage.innerHTML = "Class is full";
        setTimeout(() => {
          errorMessage.innerHTML = "";
        }, 3000);
        return;
      }

      if (parentCourse.status.toUpperCase() != "OPEN") {
        errorMessage.innerHTML = "Class is not open for enrollment";
        setTimeout(() => {
          errorMessage.innerHTML = "";
        }, 3000);
        return;
      }

      for (let c of student.classes) {
        if (
          (await classRepo.getClass(c.classNo)).parentCourse ==
            parentCourse.courseNo &&
          c.grade >= 60
        ) {
          errorMessage.innerHTML = "You already passed this course";
          setTimeout(() => {
            errorMessage.innerHTML = "";
          }, 3000);
          return;
        }

        if (
          (await classRepo.getClass(c.classNo)).parentCourse ==
            parentCourse.courseNo &&
          c.grade == null
        ) {
          errorMessage.innerHTML = "You already registered in this course";
          setTimeout(() => {
            errorMessage.innerHTML = "";
          }, 3000);
          return;
        }
      }

      if (
        areListsEqual(
          student.classes.map((cls) => cls.classNo),
          parentCourse.prerequisites
        ) == false
      ) {
        errorMessage.innerHTML = "You have to pass the prerequisites first";
        setTimeout(() => {
          errorMessage.innerHTML = "";
        }, 3000);

        return;
      }

      student.classes.push({
        classNo: classNo,
        grade: null,
      });
      clas.noOfStudents++;
      await studentRepo.updateStudent(student);
      await classRepo.updateClass(clas);
      approveMessage.innerHTML = "You have been enrolled successfully";
      errorMessage.innerHTML = "";
      setTimeout(() => {
        approveMessage.innerHTML = "";
      }, 3000);
      setTimeout(() => {
        errorMessage.innerHTML = "";
      }, 3000);
    });
  });
}

function areListsEqual(list1, list2) {
  if (list1.length !== list2.length) return false;

  const sorted1 = [...list1].sort();
  const sorted2 = [...list2].sort();

  return sorted1.every((value, index) => value === sorted2[index]);
}

async function templateCourses(course) {
  const classes = await Promise.all(
    course.classes.map((classItem) => classRepo.getClass(classItem))
  );

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
            <p>Status: ${course.status}</p>
            <p id="studentsNo">Number of students: </p>
            <p id="classTime">Class Time: </p>
            <p id="classDays">Class Days: </p>
        </div>
        <div class="footer">
            <select class="classSelect">
                <option value="">Select instructor</option>
                ${classes
                  .map(
                    (classItem) =>
                      `<option value="${classItem.instructor}-${classItem.classNo}">${classItem.instructor}</option>`
                  )
                  .join("")}
            </select>
            <button class="enroll-btn">Enroll</button>
            <p class="error-message"> </p>
            <p class="approved-message"> </p>
        </div>
    </div>
    `;
}

async function type() {
  handleSearch();
}

async function handleSearch() {
  let selectedValue = typeOfSearch.value;

  let courses = await courseRepo.getCourses();
  if (selectedValue == "By name") {
    courses = courses.filter((course) =>
      course.name.toUpperCase().includes(search.value.toUpperCase())
    );
  } else {
    courses = courses.filter((course) =>
      course.category.toUpperCase().includes(search.value.toUpperCase())
    );
  }

  const htmlArray = await Promise.all(
    courses.map((course) => templateCourses(course))
  );
  cardsContainer.innerHTML = htmlArray.join("\n");

  //  عشان اذا سويت تحديث من البحث ما تخرب الخاصية

  const selects = document.querySelectorAll(".classSelect");
  selects.forEach((select) => {
    select.addEventListener("change", async (e) => {
      const card = select.closest(".card");
      const studentsNo = card.querySelector("#studentsNo");

      if (e.target.value) {
        const classNo = parseInt(e.target.value.split("-")[1]);
        const classItem = await classRepo.getClass(classNo);
        studentsNo.innerHTML = `Number of students: ${classItem.noOfStudents}`;
        classTime.innerHTML = `Class Time: ${classItem.classTime}`;
        classDays.innerHTML = `Class Days: ${classItem.classDays}`;
      } else {
        studentsNo.innerHTML = "Number of students: ";
        classTime.innerHTML = "Class Time: ";
        classDays.innerHTML = "Class Days: ";
      }
    });
  });

  const enroll = document.querySelectorAll(".enroll-btn");
  enroll.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const card = btn.closest(".card");
      const select = card.querySelector(".classSelect");
      const selectedValue = select.value;
      const classNo = parseInt(selectedValue.split("-")[1]);
      const clas = await classRepo.getClass(classNo);
      const parentCourse = await courseRepo.getCourse(clas.parentCourse);
      const errorMessage = card.querySelector(".error-message");
      const approveMessage = card.querySelector(".approved-message");
      // Did the student passed the course

      if (clas.noOfStudents >= 30) {
        errorMessage.innerHTML = "Class is full";
        setTimeout(() => {
          errorMessage.innerHTML = "";
        }, 3000);
        return;
      }

      if (parentCourse.status.toUpperCase() != "OPEN") {
        errorMessage.innerHTML = "Course is not open for enrollment";
        setTimeout(() => {
          errorMessage.innerHTML = "";
        }, 3000);
        return;
      }

      for (let c of student.classes) {
        if (
          (await classRepo.getClass(c.classNo)).parentCourse ==
            parentCourse.courseNo &&
          c.grade >= 60
        ) {
          errorMessage.innerHTML = "You already passed this course";
          setTimeout(() => {
            errorMessage.innerHTML = "";
          }, 3000);
          return;
        }

        if (
          (await classRepo.getClass(c.classNo)).parentCourse ==
            parentCourse.courseNo &&
          c.grade == null
        ) {
          errorMessage.innerHTML = "You already registered in this course";
          setTimeout(() => {
            errorMessage.innerHTML = "";
          }, 3000);
          return;
        }
      }

      if (
        areListsEqual(
          student.classes.map((cls) => cls.classNo),
          parentCourse.prerequisites
        ) == false
      ) {
        errorMessage.innerHTML = "You have to pass the prerequisites first";
        setTimeout(() => {
          errorMessage.innerHTML = "";
        }, 3000);

        return;
      }

      student.classes.push({
        classNo: classNo,
        grade: null,
      });
      clas.noOfStudents++;
      await studentRepo.updateStudent(student);
      await classRepo.updateClass(clas);
      approveMessage.innerHTML = "You have been enrolled successfully";
      errorMessage.innerHTML = "";
      setTimeout(() => {
        approveMessage.innerHTML = "";
      }, 3000);
      setTimeout(() => {
        errorMessage.innerHTML = "";
      }, 3000);
    });
  });
}

/*

    <div class="card">
        <h1>Hello</h1>
    </div>

*/
