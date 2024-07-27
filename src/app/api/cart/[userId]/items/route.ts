"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Cart } from "@/modules";
import { NextRequest } from "next/server";

/** /api/cart/[userId]/items */
export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const data = await req.json();
    const cart = await Cart.update(params.userId, data);
    return ResponseHandler.success(cart, 201);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}


/** /api/cart/[userId]/items */
// export async function DELETE_ALL(req: NextRequest, { params }: { params: { userId: string } }) {
//   try {
//     const cart = await Cart.findOneAndUpdate(
//       { user: new ObjectId(params.userId) },
//       { $set: { items: [] } },
//       { new: true }
//     );
//     return ResponseHandler.success(cart);
//   } catch (error) {
//     const err = new DatabaseError(error);
//     return ResponseHandler.error(err, err.code);
//   }
// }
