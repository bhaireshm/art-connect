"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Cart } from "@/modules";
import { SCHEMA_NAMES } from "@/utils/constants";
import { NextRequest } from "next/server";

/**
 * Get Cart
 * GET /api/cart/[userId]
 * 
 * Retrieves the cart details for a specific user, including the items and the total cost. 
 */
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const cart = await Cart.m.findOne({ user: params.userId }).populate({
      path: "items.artwork",
      model: SCHEMA_NAMES.ARTWORK,
      populate: {
        path: "artist",
        model: SCHEMA_NAMES.ARTIST
      }
    });
    return ResponseHandler.success(cart);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}
