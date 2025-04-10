async function loadData() {
  const [courseRes, studentRes] = await Promise.all([
    fetch('data/courses.json'),
    fetch('data/students.json')
  ]);
  window.courses = await courseRes.json();
  window.students = await studentRes.json();
  renderCourses();
  setupAddCourseForm();
  renderInstructorClasses("Dr. A");
}

function renderCourses() {
  const container = document.getElementById("course-list");
  container.innerHTML = "";
  courses.forEach(course => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${course.name} (${course.category}) - ${course.status}</h3>` +
      course.classes.map(cls => `
        <div>
          Instructor: ${cls.instructor}<br>
          Students: ${cls.students.length}<br>
          Validated: ${cls.validated}<br>
          <button onclick="validateClass('${course.id}', '${cls.instructor}')">Validate</button>
          <button onclick="cancelClass('${course.id}', '${cls.instructor}')">Cancel</button>
        </div><hr>`).join('');
    container.appendChild(div);
  });
}

function validateClass(courseId, instructor) {
  const course = courses.find(c => c.id === courseId);
  const cls = course.classes.find(c => c.instructor === instructor);
  cls.validated = true;
  alert(`Class by ${instructor} validated.`);
  renderCourses();
}

function cancelClass(courseId, instructor) {
  const course = courses.find(c => c.id === courseId);
  course.classes = course.classes.filter(c => c.instructor !== instructor);
  alert(`Class by ${instructor} cancelled.`);
  renderCourses();
}

function setupAddCourseForm() {
  document.getElementById("new-course-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(this);
    const newCourse = {
      id: data.get("id"),
      name: data.get("name"),
      category: data.get("category"),
      status: "open",
      classes: [
        { instructor: data.get("instructor"), students: [], validated: false }
      ]
    };
    courses.push(newCourse);
    alert("Course created.");
    renderCourses();
    this.reset();
  });
}

function renderInstructorClasses(instructor) {
  const container = document.getElementById("instructor-classes");
  container.innerHTML = "";
  courses.forEach(course => {
    course.classes.filter(cls => cls.instructor === instructor).forEach(cls => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<h3>${course.name}</h3>` +
        `<form onsubmit="submitGrades(event, '${course.id}', '${cls.instructor}')">
          ${cls.students.map(sid => `
            ${sid}: <input name="${sid}" type="text" required><br>
          `).join('')}
          <button type="submit">Submit Grades</button>
        </form>`;
      container.appendChild(div);
    });
  });
}

function submitGrades(e, courseId, instructor) {
  e.preventDefault();
  const data = new FormData(e.target);
  const grades = {};
  data.forEach((val, key) => grades[key] = val);
  alert(`Grades submitted for course ${courseId}:\n` + JSON.stringify(grades, null, 2));
}

loadData();
