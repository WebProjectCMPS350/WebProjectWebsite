import student from "@/app/repos/Student";

const studentRepo = new student();

export async function GET(req) {
  const clas = await studentRepo.getClasses();
  return Response.json(clas, { status: 200 });
}

export async function PUT(req) {
  const clas = await req.json();
  const newClass = await studentRepo.updateClass(clas.classNo ,clas);
  return Response.json(newClass, { status: 200 });
}

export async function POST(req) {
  const clas = await req.json();
  const newClass = await studentRepo.createClass(clas);
  return Response.json(newClass, { status: 201 });
}

export async function DELETE(req) {
  const clas = await req.json();
  const newClass = await studentRepo.deleteClass(clas.classNo ,clas);
  return Response.json(newClass, { status: 200 });
}
