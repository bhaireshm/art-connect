import { DB, DBCrud } from "@/database";
import { SCHEMA_NAMES } from "@/utils/constants";
import { Schema, model, models } from "mongoose";
import { addressSchema } from "./address";

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.USER, required: true },
  items: [
    {
      artwork: {
        type: Schema.Types.ObjectId,
        ref: SCHEMA_NAMES.ARTWORK,
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalCost: { type: Number, required: true },
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  paymentMethod: { type: String }, // TODO: Add payment methods
  orderStatus: { type: String }, // TODO: Add order statuses
  orderDate: { type: Date, default: Date.now },
  estimatedDeliveryDate: { type: Date }, // TODO: Add estimated delivery date
}, DB.getDefaultSchemaOptions());

const Order = new DBCrud<typeof orderSchema>(
  models[SCHEMA_NAMES.ORDER] || model(SCHEMA_NAMES.ORDER, orderSchema),
);

export default Order;
