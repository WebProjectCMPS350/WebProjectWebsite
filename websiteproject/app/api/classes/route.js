import classRepo from "@/app/repos/Class";

export async function GET(req) {
  const clas = await classRepo.getClasses();
  return Response.json(clas, { status: 200 });
}

export async function PUT(req) {
  const clas = await req.json();
  const newClass = await classRepo.updateClass(clas.classNo, clas);
  return Response.json(newClass, { status: 200 });
}

export async function POST(req) {
  const clas = await req.json();
  const newClass = await classRepo.createClass(clas);
  return Response.json(newClass, { status: 201 });
}

export async function DELETE(req) {
  const clas = await req.json();
  const newClass = await classRepo.deleteClass(clas.classNo, clas);
  return Response.json(newClass, { status: 200 });
}
