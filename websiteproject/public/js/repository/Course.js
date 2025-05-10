const baseUrl = "/api/courses";

class Course {
  async getCourses() {
    const response = await fetch(baseUrl);
    return response.json();
  }

  async getCoursesByName(name) {
    const courses = await this.getCourses();
    return courses.filter(
      (course) => course.name.toLowerCase() == name.toLowerCase()
    );
  }

  async getCoursesByCategory(category) {
    const courses = await this.getCourses();
    return courses.filter(
      (course) => course.category.toLowerCase() == category.toLowerCase()
    );
  }

  async getCourse(courseNo) {
    const courses = await this.getCourses();
    const course = courses.find((course) => course.courseNo == courseNo);
    if (!course) {
      return { error: "Account not found" };
    }
    return course;
  }

  async createCourse(course) {
    return await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
  }

  async updateCourse(course) {
    return await fetch(baseUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
  }

  async deleteCourse(course) {
    return await fetch(`${baseUrl}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
  }

  static async read() {
    const response = await fetch("../data/courses.json");
    return response.json();
  }

  static async write(courses) {
    const response = await fetch("../data/courses.json");
    const cs = response.json();
  }

  async getCourseClasses(courseNo) {
    const response = await fetch(`${baseUrl}/${courseNo}/classes`);
    return response.json();
  }
}

export default new Course();
