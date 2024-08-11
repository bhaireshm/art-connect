import { ResponseHandler } from "@/core";
import { User } from "@/modules";
import type { Params } from "@/types";
import { SCHEMA_NAMES } from "@/utils/constants";
import type { NextRequest } from "next/server";

/**
 * Get wishlists
 * GET /api/wishlist/[uid]
 * 
 * Get user's wishlisted artworks and its artist information.
 */
const uid = "uid";

export async function GET(req: NextRequest, { params }: Params<typeof uid>) {
  const userId = params.uid;
  if (!userId) return ResponseHandler.error({ userId }, "Missing/Invalid user ID", 400);

  const user = await User.findById(userId, { password: 0 });
  if (!user) return ResponseHandler.error({ user, userId }, "User not found", 404);

  await user.populate({
    path: "wishlist",
    model: SCHEMA_NAMES.ARTWORK,
    populate: {
      path: "artist",
      model: SCHEMA_NAMES.ARTIST
    }
  });

  return ResponseHandler.success(user);
}
