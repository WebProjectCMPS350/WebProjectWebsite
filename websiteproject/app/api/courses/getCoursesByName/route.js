import courseRepo from "@/app/repos/Course";

// from searchParams

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const courses = await courseRepo.getCourseByName(name);
  return new Response(JSON.stringify(courses), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
