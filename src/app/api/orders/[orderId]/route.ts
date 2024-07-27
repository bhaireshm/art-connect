"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Order } from "@/modules"; // Assuming the Order model is exported from "@/modules"
import { NextRequest } from "next/server";

/** /api/orders/[orderId] */
export async function GET(req: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const order = await Order.findById(params.orderId);
    return ResponseHandler.success(order);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}
