import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const usersFilePath = path.join(process.cwd(), 'app', 'data', 'students.json'); // or users.json

export async function POST(request) {
  const { name, email, password, role } = await request.json();

  const file = await readFile(usersFilePath, 'utf-8');
  const users = JSON.parse(file);

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const newUser = { id: Date.now(), name, email, password, role };
  users.push(newUser);

  await writeFile(usersFilePath, JSON.stringify(users, null, 2));

  const id_token = jwt.sign(newUser, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

  return NextResponse.json({ ...newUser, id_token });
}
