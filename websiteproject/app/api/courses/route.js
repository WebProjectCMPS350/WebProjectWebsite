import course from "@/app/repos/Course";

const courseRep = new course();
export async function GET(req, { params }) {
  const course = await courseRep.getCourses();
  return Response.json(course, { status: 200 });
}

export async function PUT(req, { params }) {
  const accountNo = (await params).accountNo;
  const course = await req.json();
  const updatedAccount = await courseRepo.updateAccount(accountNo, account);
  return Response.json(updatedAccount, { status: 200 });
}

export async function DELETE(req, { params }) {
  const accountNo = (await params).accountNo;
  const message = await courseRepo.deleteAccount(accountNo);
  return Response.json(message, { status: 200 });
}
