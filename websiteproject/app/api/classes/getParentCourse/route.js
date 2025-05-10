import classRepo from "@/app/repos/Class.js";

// use search params to get the parent course

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const classNo = searchParams.get("classNo");

  const parentCourse = await classRepo.getParentCourse(classNo);

  return new Response(JSON.stringify(parentCourse), { status: 200 });
}
