"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Cart } from "@/modules";
import { NextRequest } from "next/server";

/** 
 * Add Item to Cart
 * POST /api/cart/[userId]/items
 * 
 * Adds an item to the user's cart. The request body should contain the artwork ID and the quantity.
 */
export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const data = await req.json();
    const cart = await Cart.update({ user: params.userId }, data);
    return ResponseHandler.success(cart, 201);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}

/**
 * Clear Cart
 * DELETE /api/cart/[userId]/items
 *
 * Removes all items from the user's cart, essentially clearing the cart.
 */
export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const cart = await Cart.update(
      { user: params.userId },
      { $set: { items: [] } },
      { new: true }
    );
    return ResponseHandler.success(cart);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}
