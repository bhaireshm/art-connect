"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Cart } from "@/modules";
import { NextRequest } from "next/server";

/** 
 * Update Item in Cart
 * PUT /api/cart/[userId]/items/[itemId]
 * 
 * Updates the quantity of a specific item in the cart. The request body should contain the new quantity.
 */
export async function PUT(req: NextRequest, { params }: { params: { userId: string, itemId: string } }) {
  try {
    const data = await req.json();
    const cart = await Cart.update(
      { user: params.userId, "items.id": params.itemId },
      { $set: { "items.$.quantity": data.quantity } },
      { $set: { "items.quantity": data.quantity } },
    );
    return ResponseHandler.success(cart);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}

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
      { $pull: { items: { id: params.itemId } } },
      { new: true }
    );
    return ResponseHandler.success(cart);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}