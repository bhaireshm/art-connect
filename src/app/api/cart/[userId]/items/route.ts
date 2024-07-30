"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Cart } from "@/modules";
import { STATUS_TEXT } from "@/utils/constants";
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
    const { items, totalCost }: any = data;

    const operations = items.map((item: any) => ({
      updateOne: {
        filter: {
          user: params.userId,
          "items.artwork": item.artwork
        },
        update: {
          $set: { "items.$.quantity": item.quantity }
        },
        upsert: false
      }
    }));

    operations.push({
      updateOne: {
        filter: { user: params.userId },
        update: {
          $setOnInsert: { user: params.userId },
          $set: { totalCost },
          $addToSet: {
            items: {
              $each: items.map((item: { artwork: any; quantity: any; }) => ({
                artwork: item.artwork,
                quantity: item.quantity
              }))
            }
          }
        },
        upsert: true
      }
    });

    await Cart.m.bulkWrite(operations);

    const updatedCart = await Cart.findOne({ user: params.userId });
    return ResponseHandler.success(updatedCart, STATUS_TEXT.CREATED);
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
      { $set: { items: [], totalCost: 0 } },
      { new: true }
    );
    return ResponseHandler.success(cart);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}
