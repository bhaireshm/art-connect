"use server";

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments

import DatabaseError from "@/database/db.error";
import { User } from "@/modules";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const users = await User.findAll({});
  return NextResponse.json({ data: users });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const user = await User.create(data);
    return NextResponse.json({ data: user });
  } catch (error) {
    const err = new DatabaseError(error).format();
    return NextResponse.json(err, { status: err.status });
  }
}

// Form data example
// export async function POST(request: Request) {
//   const formData = await request.formData()
//   const name = formData.get('name')
//   const email = formData.get('email')
//   return Response.json({ name, email })
// }
