import DatabaseCRUD from "@/database/db.crud";
import { SCHEMA_NAMES } from "@/utils/constants";
import { Schema, model, models } from "mongoose";

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
      price: { type: Number, required: true },
    },
  ],
  totalCost: { type: Number, required: true },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  billingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  paymentMethod: { type: String, required: true },
  orderStatus: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  estimatedDeliveryDate: { type: Date, required: true },
});

const Order = new DatabaseCRUD<typeof orderSchema>(
  models[SCHEMA_NAMES.ORDER] || model(SCHEMA_NAMES.ORDER, orderSchema),
);

export default Order;
