import User from "./User.js";
const baseUrl = "/api/administrators";

class Administrator extends User {

  constructor(name, username, password) {
    super(name, username, password);
  }

  async getAdministrators() {
    const response = await fetch(baseUrl);
    return response.json();
  }

  async getAdministrator(username) {
    const administrators = await this.getAdministrators();
    const administrator = administrators.find(
      (administrator) => administrator.username == username
    );
    if (!administrator) {
      return { error: "Administrators not found" };
    }
    return administrator;
  }

  async createAdministrator(administrator) {
    return await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(administrator),
    });
  }

  async updateAdministrator(administrator) {
    return await fetch(baseUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(administrator),
    });
  }

  async deleteAdministrator(administrator) {
    return await fetch(`${baseUrl}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(administrator),
    });
  }
}

export default new Administrator();
