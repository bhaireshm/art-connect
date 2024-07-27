// "use server";

// import { ResponseHandler } from "@/core";
// import DatabaseError from "@/database/db.error";
// import { Cart } from "@/modules";
// import { NextRequest } from "next/server";
/** /api/cart/[userId]/checkout/route.ts */
// export async function POST_CHECKOUT(req: NextRequest, { params }: { params: { userId: string } }) {
//   try {
//     const cart = await Cart.findOne({ user: new ObjectId(params.userId) });
//     // Logic for checkout process, e.g., creating an order, processing payment
//     return ResponseHandler.success({ cart, message: "Checkout process initiated." });
//   } catch (error) {
//     const err = new DatabaseError(error);
//     return ResponseHandler.error(err, err.code);
//   }
// }
