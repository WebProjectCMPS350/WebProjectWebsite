import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { token } = await req.json();
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return NextResponse.json({ valid: true, user });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
