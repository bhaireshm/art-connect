// "use server";

// import { ResponseHandler } from "@/core";
// import DatabaseError from "@/database/db.error";
// import { Cart } from "@/modules";
// import { NextRequest } from "next/server";

/** /api/cart/[userId]/items/[itemId]/route.ts */
// export async function PUT(req: NextRequest, { params }: { params: { userId: string, itemId: string } }) {
//   try {
//     const data = await req.json();
//     const cart = await Cart.findOneAndUpdate(
//       { user: new ObjectId(params.userId), "items._id": new ObjectId(params.itemId) },
//       { $set: { "items.$.quantity": data.quantity } },
//       { new: true }
//     );
//     return ResponseHandler.success(cart);
//   } catch (error) {
//     const err = new DatabaseError(error);
//     return ResponseHandler.error(err, err.code);
//   }
// }


/** /api/cart/[userId]/items/[itemId] */
// export async function DELETE(req: NextRequest, { params }: { params: { userId: string, itemId: string } }) {
//   try {
//     const cart = await Cart.findOneAndUpdate(
//       { user: new ObjectId(params.userId) },
//       { $pull: { items: { _id: new ObjectId(params.itemId) } } },
//       { new: true }
//     );
//     return ResponseHandler.success(cart);
//   } catch (error) {
//     const err = new DatabaseError(error);
//     return ResponseHandler.error(err, err.code);
//   }
// }