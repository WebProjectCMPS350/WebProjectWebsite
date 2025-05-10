import courseRepo from "@/app/repos/Course";

export async function GET(req, { params }) {
  const { courseNo } = await params;
  const classes = await courseRepo.getCourseClasses(parseInt(courseNo));
  return new Response(JSON.stringify(classes), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
