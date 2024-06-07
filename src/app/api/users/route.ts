"use server";

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments
import { NextRequest } from "next/server";

import ResponseHandler from "@/core/response.handler";
import DatabaseError from "@/database/db.error";
import { User } from "@/modules";
import { hashData } from "@/utils/helpers";

/** /api/users/ */
export async function GET() {
  const users = await User.findAll({});
  return ResponseHandler.success(users);
}

/** /api/users/ */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Encrypt the password
    if (data.password) data.password = hashData(data.password);

    // Create user
    const user = await User.create(data);

    return ResponseHandler.success(user.length === 1 ? user[0] : user, 201);
  } catch (error) {
    const err = new DatabaseError(error).format();
    return ResponseHandler.error(err, err.message, 400);
  }
}
