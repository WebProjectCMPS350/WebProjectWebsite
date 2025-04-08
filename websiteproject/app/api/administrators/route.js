import administrator from "@/app/repos/Administrator";

const adminRepo = new administrator();

export async function GET(req) {
  const admin = await adminRepo.getAdministrators();
  return Response.json(admin, { status: 200 });
}

export async function PUT(req) {
  const admin = await req.json();
  const newAdmin = await adminRepo.updateAdministrator(admin.username ,admin);
  return Response.json(newAdmin, { status: 200 });
}

export async function POST(req) {
  const admin = await req.json();
  const newAdmin = await adminRepo.createAdministrator(admin);
  return Response.json(newAdmin, { status: 201 });
}

export async function DELETE(req) {
  const admin = await req.json();
  const newAdmin = await adminRepo.deleteAdministrator(admin.username ,admin);
  return Response.json(newAdmin, { status: 200 });
}
