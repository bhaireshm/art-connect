"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Cart, CartItem } from "@/modules";
import { STATUS_TEXT } from "@/utils/constants";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

/** 
 * Add Item to Cart
 * POST /api/cart/[userId]/items
 * 
 * Adds or updates items in the user's cart. The request body should contain the artwork IDs and quantities.
 */
export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const data = await req.json();
    const { items, totalCost }: any = data;

    const userId = new Types.ObjectId(params.userId);

    // Find existing cart or create a new one
    const cart: any = await Cart.findOneAndUpdate({ user: userId }, { user: userId, items: [], totalCost: 0 });

    // Process each item
    for (const item of items) {
      const artworkId = new Types.ObjectId(item.artwork);

      // Check if the item already exists in the cart
      const existingItemIndex = cart.items.findIndex((cartItem: any) =>
        cartItem.artwork.toString() === artworkId.toString()
      );

      if (existingItemIndex > -1)
        // Update existing item
        cart.items[existingItemIndex].quantity = item.quantity;
      else {
        // Create new CartItem
        const newCartItem: any = await CartItem.create({
          artwork: artworkId,
          quantity: item.quantity
        });
        cart.items.push(newCartItem._id);
      }
    }

    // Update total cost
    cart.totalCost = totalCost;

    // Save the updated cart
    await cart.save();

    // Populate the items in the updated cart
    await cart.populate("items");

    return ResponseHandler.success(cart, STATUS_TEXT.CREATED);
  } catch (error) {
    console.error(error);
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
      { $set: { items: [], totalCost: 0 } },
      { new: true }
    );
    return ResponseHandler.success(cart);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}
