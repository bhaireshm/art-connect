"use server";

import DatabaseError from "@/database/db.error";
import { User } from "@/models";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const data = await User.read({});
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const _user = await User.create(data);
    return NextResponse.json({ data: _user });
  } catch (error) {
    const err = new DatabaseError(error).format();
    return NextResponse.json(err, { status: err.status });
  }
}
