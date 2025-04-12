const baseUrl = "/api/courses";


class Course {
  #courseNo;
  #name;
  #classList;
  #category;
  #status;

  constructor(name, category, courseNo) {
    this.#courseNo;
    this.#name = name;
    this.#classList = [];
    this.#category = category;
    this.#courseNo = courseNo;
    this.#status = "Pending";
  }


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


  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get courseNo() {
    return this.#courseNo;
  }

  set courseNo(newCourseNo) {
    this.#name = newCourseNo;
  }

  get classList() {
    return this.#classList;
  }

  get category() {
    return this.#category;
  }

  set category(newCategory) {
    this.#category = newCategory;
  }

  get status() {
    return this.#status;
  }

  set status(newStatus) {
    this.#status = newStatus;
  }

  static async read() {
    const response = await fetch("../data/courses.json");
    return response.json();
  }

  static async write(courses) {
    const response = await fetch("../data/courses.json");
    const cs = response.json();
  }
}

export default new Course();
