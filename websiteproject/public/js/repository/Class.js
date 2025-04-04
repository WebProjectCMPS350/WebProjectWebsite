const baseUrl = "/api/classes";


class Class {
  #name;
  #classNo;
  #course;
  #instructor;
  #students;

  constructor(name, course, instructor, classNo) {
    this.#name = name;
    this.#students = [];
    this.#course = course;
    this.#classNo = classNo;
    this.#instructor = instructor;
  }


  async getClasses() {
    const response = await fetch(baseUrl);
    return response.json();
  }

  async getClass(classeNo) {
    const classes = await this.getClasses();
    const clas = classes.find((clas) => clas.classeNo == classeNo);
    if (!clas) {
      return { error: "Class not found" };
    }
    return clas;
  }

  async createClass(clas) {
    return await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clas),
    });
  }

  async updateClass(clas) {
    return await fetch(baseUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clas),
    });
  }

  async deleteClass(clas) {
    return await fetch(`${baseUrl}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: clas,
    });
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get classNo() {
    return this.#classNo;
  }

  set classNo(newClassNo) {
    this.#classNo = newClassNo;
  }

  get students() {
    return this.#students;
  }

  get course() {
    return this.#course;
  }

  set course(course) {
    this.#course = course;
  }

  get instructor() {
    return this.#instructor;
  }

  set instructor(instructor) {
    this.#instructor = instructor;
  }

  getStudentsNo() {
    return -1;
  }
}

export default new Class();
