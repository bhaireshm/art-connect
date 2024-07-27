"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Cart } from "@/modules";
import { NextRequest } from "next/server";

/** /api/cart/[userId] */
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const cart = await Cart.findOne({ user: params.userId });
    return ResponseHandler.success(cart);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}
