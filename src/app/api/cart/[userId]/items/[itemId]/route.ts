"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Cart, CartItem } from "@/modules";
import { SCHEMA_NAMES } from "@/utils/constants";
import { NextRequest } from "next/server";

/**
 * Remove Item from Cart
 * DELETE /api/cart/[userId]/items/[itemId]
 * 
 * Removes a specific item from the user's cart.
 */
export async function DELETE(req: NextRequest, { params }: { params: { userId: string, itemId: string } }) {
  try {
    const cart: any = await Cart.findOne({ user: params.userId });
    if (!cart) return ResponseHandler.error("Cart not found", 404);

    const cartItem = cart.items.find((item: any) => item.toString() === params.itemId);
    if (!cartItem) return ResponseHandler.error("Cart item not found", 404);

    await cart?.populate({
      path: "items",
      model: SCHEMA_NAMES.CART_ITEM,
      populate: {
        path: "artwork",
        model: SCHEMA_NAMES.ARTWORK,
      }
    });

    // Remove the item from the cart
    await CartItem.findByIdAndDelete(cartItem);

    const updatedItems = cart.items.filter((item: any) => item.id.toString() !== params.itemId);
    const totalCost = updatedItems.reduce((total: number, item: any) => total + item.artwork.price * item.quantity, 0);

    cart.items = updatedItems;
    cart.totalCost = totalCost;

    await cart.save();

    return ResponseHandler.success(cart);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}