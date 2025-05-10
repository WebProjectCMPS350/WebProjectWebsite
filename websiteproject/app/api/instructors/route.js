import instructorRepo from "@/app/repos/Instructor";

export async function GET(req) {
  const instructor = await instructorRepo.getInstructors();
  return Response.json(instructor, { status: 200 });
}

export async function PUT(req) {
  const instructor = await req.json();
  const newInstructor = await instructorRepo.updateInstructor(
    instructor.username,
    instructor
  );
  return Response.json(newInstructor, { status: 200 });
}

export async function POST(req) {
  const instructor = await req.json();
  const newInstructor = await instructorRepo.createInstructor(instructor);
  return Response.json(newInstructor, { status: 201 });
}

export async function DELETE(req) {
  const instructor = await req.json();
  const newInstructor = await instructorRepo.deleteInstructor(
    instructor.username,
    instructor
  );
  return Response.json(newInstructor, { status: 200 });
}
