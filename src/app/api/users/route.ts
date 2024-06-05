"use server";

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments
import { NextRequest } from "next/server";

import ResponseHandler from "@/core/response.handler";
import DatabaseError from "@/database/db.error";
import { User } from "@/modules";

export async function GET() {
  const users = await User.findAll({});
  return ResponseHandler.success(users);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const user = await User.create(data);
    return ResponseHandler.success(user, 201);
  } catch (error) {
    const err = new DatabaseError(error).format();
    return ResponseHandler.error(err, err.message, 400);
  }
}

// Form data example
// export async function POST(request: Request) {
//   const formData = await request.formData()
//   const name = formData.get('name')
//   const email = formData.get('email')
//   return Response.json({ name, email })
// }
