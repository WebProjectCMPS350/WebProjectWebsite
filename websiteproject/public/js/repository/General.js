const courses_URL = "/api/courses";
const instructors_URL = "/api/instructors";
const students_URL = "/api/students";
const administrators_URL = "/api/administrators";
const classes_URL = "/api/classes";

class General {
  async handleLoginPage(username, password) {
    const response = await fetch(
      `/api/general/handleLoginPage?username=${username}&password=${password}`
    );
    const data = await response.json();
    return data;
  }

  async getCourses() {
    const response = await fetch(courses_URL);
    return response.json();
  }

  async getInstructors() {
    const response = await fetch(instructors_URL);
    return response.json();
  }

  async getStudents() {
    const response = await fetch(students_URL);
    return response.json();
  }

  async getAdministrators() {
    const response = await fetch(administrators_URL);
    return response.json();
  }

  async getClasses() {
    const response = await fetch(classes_URL);
    return response.json();
  }
}

export default new General();
