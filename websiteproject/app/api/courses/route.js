import courseRepo from "@/app/repos/Course";

export async function GET(req) {
  const course = await courseRepo.getCourses();
  return Response.json(course, { status: 200 });
}

export async function PUT(req) {
  const course = await req.json();
  const newCourse = await courseRepo.updateCourse(course.courseNo, course);
  return Response.json(newCourse, { status: 200 });
}

export async function POST(req) {
  const course = await req.json();
  const newCourse = await courseRepo.createCourse(course);
  return Response.json(newCourse, { status: 201 });
}

export async function DELETE(req) {
  const course = await req.json();
  const newCourse = await courseRepo.deleteCourse(course.courseNo, course);
  return Response.json(newCourse, { status: 200 });
}
