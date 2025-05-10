import studentRepo from "./Student.js";
import instructorRepo from "./Instructor.js";
import adminRepo from "./Administrator.js";

class GeneralRepo {
  async handleLoginPage(username, password) {
    const student = await studentRepo.getStudent(username);
    const instructor = await instructorRepo.getInstructor(username);
    const admin = await adminRepo.getAdministrator(username);

    if (student && student.password === password) {
      return { role: "Student", obj: student };
    } else if (instructor && instructor.password === password) {
      return { role: "Instructor", obj: instructor };
    } else if (admin && admin.password === password) {
      return { role: "Admin", obj: admin };
    } else {
      return { role: null, obj: null };
    }
  }
}

export default new GeneralRepo();
