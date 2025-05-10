import studentRepo from "@/app/repos/Student";

export async function GET(req) {
  const stu = await studentRepo.getStudents();
  return Response.json(stu, { status: 200 });
}

export async function PUT(req) {
  const stu = await req.json();
  const newStudent = await studentRepo.updateStudent(stu.username, stu);
  return Response.json(newStudent, { status: 200 });
}

export async function POST(req) {
  const stu = await req.json();
  const newStudent = await studentRepo.createStudent(stu);
  return Response.json(newStudent, { status: 201 });
}

export async function DELETE(req) {
  const stu = await req.json();
  const newStudent = await studentRepo.deleteStudent(stu.username, stu);
  return Response.json(newStudent, { status: 200 });
}
