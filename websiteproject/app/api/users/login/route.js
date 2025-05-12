import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const usersFilePath = path.join(
  process.cwd(),
  "app",
  "data",
  "administrators.json"
); // or users.json

export async function POST(request) {
  const { email, password } = await request.json();

  const file = await readFile(usersFilePath, "utf-8");
  const users = JSON.parse(file);

  const user = users.find(
    (u) => u.username === email && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const id_token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  return NextResponse.json({ ...user, id_token });
}
