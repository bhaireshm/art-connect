import { DB, DBCrud } from "@/database";
import { SCHEMA_NAMES } from "@/utils/constants";
import { Schema, model, models } from "mongoose";

// 5. Shopping Cart Schema

const cartSchema = new Schema({
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
}, DB.getDefaultSchemaOptions());

const Cart = new DBCrud<typeof cartSchema>(
  models[SCHEMA_NAMES.CART] || model(SCHEMA_NAMES.CART, cartSchema),
);
export default Cart;
