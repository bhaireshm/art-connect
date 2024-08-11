"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Cart } from "@/modules";
import { NextRequest } from "next/server";

/** 
 * Checkout Cart
 * POST /api/cart/[userId]/checkout
 * 
 * Initiates the checkout process for the user's cart. This might involve calculating the final total, applying discounts, processing payment, etc.
 * */
export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const cart = await Cart.findOne({ user: params.userId });
    // Logic for checkout process, e.g., creating an order, processing payment
    return ResponseHandler.success({ cart, message: "Checkout process initiated." });
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}
