"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Cart } from "@/modules";
import { NextRequest } from "next/server";


/**
 * Remove Item from Cart
 * DELETE /api/cart/[userId]/items/[itemId]
 * 
 * Removes a specific item from the user's cart.
 */
export async function DELETE(req: NextRequest, { params }: { params: { userId: string, itemId: string } }) {
  try {
    const cart = await Cart.update(
      { user: params.userId },
      { $pull: { items: { _id: params.itemId } } },
      { new: true }
    );
    return ResponseHandler.success(cart);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}