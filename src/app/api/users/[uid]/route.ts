import { type NextRequest } from "next/server";

import ResponseHandler from "@/core/response.handler";
import DatabaseError from "@/database/db.error";
import { User } from "@/modules";
import type { Params } from "@/types";

const uid = "uid";

export async function GET(req: NextRequest, { params }: Params<typeof uid>) {
  const userId = params.uid;
  if (!userId) return ResponseHandler.error({ userId }, "Missing/Invalid user ID", 400);

  const user = await User.findById(userId, { password: 0 });
  if (!user) return ResponseHandler.error({ user, userId }, "User not found", 404);

  return ResponseHandler.success(user);
}

export async function PUT(req: NextRequest, { params }: Params<typeof uid>) {
  try {
    const userId = params.uid;
    if (!userId) return ResponseHandler.error({ userId }, "Missing/Invalid user ID", 400);

    const data = await req.json();
    const user = await User.update(userId, data);
    if (!user) return ResponseHandler.error({ user, userId }, "User not found", 404);

    return ResponseHandler.success(user, "User details updated");
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.message, err.code);
  }
}

export async function DELETE(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get(uid);
  if (!userId) return ResponseHandler.error({ userId }, "Missing/Invalid user ID", 400);

  const user = await User.delete({ _id: userId });
  if (user.deletedCount) return ResponseHandler.error({ user }, "User not found", 404);

  return ResponseHandler.success(user, "User deleted", 202);
}
