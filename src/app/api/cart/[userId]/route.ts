"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Cart } from "@/modules";
import { SCHEMA_NAMES } from "@/utils/constants";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

/**
 * Get Cart
 * GET /api/cart/[userId]
 * 
 * Retrieves the cart details for a specific user, including the items and the total cost. 
 */
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const cart = await Cart.findOne({ user: new Types.ObjectId(params.userId) });
    if (!cart) return ResponseHandler.error({ message: "Cart not found" }, 404);

    await cart.populate({
      path: "items",
      model: SCHEMA_NAMES.CART_ITEM,
      populate: {
        path: "artwork",
        model: SCHEMA_NAMES.ARTWORK,
        populate: {
          path: "artist",
          model: SCHEMA_NAMES.ARTIST
        }
      }
    });

    return ResponseHandler.success(cart);
  } catch (error) {
    console.error(error);
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}