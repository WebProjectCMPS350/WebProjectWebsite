import courseRepo from "@/app/repos/Course";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const courses = await courseRepo.getCoursesByCategory(category);
  return new Response(JSON.stringify(courses), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
