import { ResponseHandler } from "@/core";
import { User } from "@/modules";
import { SCHEMA_NAMES } from "@/utils/constants";
import { NextRequest } from "next/server";

const uid = "uid";

interface Params<T extends string> {
  params: {
    [key in T]: string;
  };
}

/**
 * Get wishlists
 * GET /api/wishlist/[uid]
 * 
 * Get user's wishlisted artworks and its artist information.
 */
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

/**
 * Delete wishlist
 * DELETE /api/wishlist/[uid]
 * 
 * Delete user's wishlisted artwork.
 */
export async function DELETE(req: NextRequest, { params }: Params<typeof uid>) {
  const userId = params.uid;
  const { searchParams } = new URL(req.url);
  const artworkId = searchParams.get("artworkId");

  if (!userId || !artworkId)
    return ResponseHandler.error({ userId, artworkId }, "Missing required parameters", 400);

  try {
    const user: any = await User.findById(userId);

    if (!user)
      return ResponseHandler.error({ user, userId }, "User not found", 404);

    // Remove the artworkId from the wishlist
    user.wishlist = user.wishlist.filter((id: any) => id.toString() !== artworkId);

    await user.save();

    return ResponseHandler.success({ message: "Artwork removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("Error removing artwork from wishlist:", error);
    return ResponseHandler.error(error, "Internal Server Error", 500);
  }
}