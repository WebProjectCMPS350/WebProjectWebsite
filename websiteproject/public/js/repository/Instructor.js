const baseUrl = "/api/instructors";

class Instructor {
  async getInstructors() {
    const response = await fetch(baseUrl);
    return response.json();
  }

  async getInstructor(username) {
    const instructors = await this.getInstructors();
    const instructor = instructors.find(
      (instructor) => instructor.username == username
    );
    if (!instructor) {
      return { error: "Instructor not found" };
    }
    return instructor;
  }

  async createInstructor(instructor) {
    return await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(instructor),
    });
  }

  async updateInstructor(instructor) {
    return await fetch(baseUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(instructor),
    });
  }

  async deleteInstructor(instructor) {
    return await fetch(`${baseUrl}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(instructor),
    });
  }
}

export default new Instructor();
