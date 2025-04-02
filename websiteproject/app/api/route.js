export async function GET(req) {
  const res = { message: "Hello" };
  return Response.json(res, { status: 200 });
}

export async function POST(req) {
  
}