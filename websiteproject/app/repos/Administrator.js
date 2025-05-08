import fse from "fs-extra";
import path from "path";

class Administrator {
  constructor() {
    this.administratorsFilePath = path.join(
      process.cwd(),
      "app/data/administrators.json"
    );
  }

  async saveAdministrators(administrator) {
    await fse.writeJson(this.administratorsFilePath, administrator);
  }

  async getAdministrators() {
    const administrators = await fse.readJson(this.administratorsFilePath);
    return administrators;
  }

  async getAdministrator(username) {
    const administrators = await this.getAdministrators();
    const administrator = administrators.find(
      (administrator) => administrators.username == username
    );
    if (!administrator) {
      return { error: "Administrators not found" };
    }
    return administrator;
  }

  async createAdministrator(administrator) {
    const administrators = await this.getAdministrators();
    //course.id = nanoid();
    administrators.push(administrator);
    await this.saveAdministrators(administrators);
    return administrator;
  }

  async updateAdministrator(username, administrator) {
    const administrators = await this.getAdministrators();

    const index = administrators.findIndex(
      (administrator) => administrator.username == username
    );

    if (index < 0) {
      return { error: "Administrator not found" };
    }
    administrators[index] = { ...administrators[index], ...administrator };

    await this.saveAdministrators(administrators);
    return administrators[index];
  }

  async deleteAdministrator(username) {
    const administrators = await this.getAdministrators();
    const index = administrators.findIndex(
      (administrator) => administrator.username == username
    );
    if (index < 0) {
      return { error: "Administrator not found" };
    }
    administrators.splice(index, 1);
    await this.saveAdministrators(administrators);
    return { message: "Administrator deleted successfully" };
  }
}

export default Administrator;
