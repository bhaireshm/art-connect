import { ResponseHandler } from "@/core";
import { User } from "@/modules";
import type { Params } from "@/types";
import type { NextRequest } from "next/server";

/** /api/wishlist/[uid] */
const uid = "uid";

export async function GET(req: NextRequest, { params }: Params<typeof uid>) {
  const userId = params.uid;
  if (!userId) return ResponseHandler.error({ userId }, "Missing/Invalid user ID", 400);

  const user = await User.populate({ id: userId }, "wishlist");
  if (!user) return ResponseHandler.error({ user, userId }, "User not found", 404);

  return ResponseHandler.success(user);
}

