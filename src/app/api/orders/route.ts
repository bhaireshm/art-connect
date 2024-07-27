"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Order } from "@/modules"; // Assuming the Order model is exported from "@/modules"
import { NextRequest } from "next/server";

/** /api/orders */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const order = await Order.create(data);
    return ResponseHandler.success(order, 201);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}

/** /api/orders */
export async function GET() {
  try {
    const orders = await Order.findAll({});
    return ResponseHandler.success(orders);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}
