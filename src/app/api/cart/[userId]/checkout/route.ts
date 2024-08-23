"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Cart, Order } from "@/modules";
import { NextRequest } from "next/server";

/** 
 * Checkout Cart
 * POST /api/cart/[userId]/checkout
 * 
 * Initiates the checkout process for the user's cart. This might involve calculating the final total, applying discounts, processing payment, etc.
 * */
export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const data: any = await req.json();
    const { userId } = params;

    const cart: any = await Cart.findOne({ user: userId });
    if (!cart) return ResponseHandler.error("Cart not found", 404);

    // Populate the items in the updated cart
    await cart.populate("items");
    if (!cart || cart.items.length === 0) return ResponseHandler.error("Cart is empty", 400);

    // Create a new order
    const order = await Order.create(
      // { user: userId, }, // TODO:
      {
        user: userId,
        items: cart.items,
        totalCost: cart.totalCost,
        shippingAddress: { ...data.shippingAddress },
        billingAddress: { ...data.billingAddress },
      },
      // { upsert: true }
    );

    // Clear the user's cart
    cart.items = [];
    cart.totalCost = 0;
    await cart.save();

    return ResponseHandler.success({ order, cart, message: "Checkout process initiated." }, 201);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}