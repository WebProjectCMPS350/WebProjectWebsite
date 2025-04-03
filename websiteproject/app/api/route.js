 

export async function GET(req) {
  const res = { message: "Hello" };
  return Response.json(res, { status: 200 });
}

export async function POST(req) {
  const res = await req.json();
  return Response.json(res, { status: 200 });
}

export async function PUT(req) {
  const res = { message: "Hello" };
  return Response.json(res, { status: 200 });
}


export async function DELETE(req) {
  const res = { message: "Hello" };
  return Response.json(res, { status: 200 });
}


