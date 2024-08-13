import { DB, DBCrud } from "@/database";
import { SCHEMA_NAMES } from "@/utils/constants";
import { Schema, model, models } from "mongoose";

const toJSON: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & { _id: import("mongoose").Types.ObjectId; }> | undefined = {
  transform(_, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
};

export const CartItemSchema = new Schema(
  {
    artwork: { type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTWORK, required: true },
    quantity: { type: Schema.Types.Number, required: true }
  },
  DB.getDefaultSchemaOptions({ toJSON })
);

export const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.USER, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.CART_ITEM }],
    totalCost: { type: Schema.Types.Number, required: true }
  },
  DB.getDefaultSchemaOptions({ toJSON })
);

const CartItem = new DBCrud<typeof CartItemSchema>(
  models[SCHEMA_NAMES.CART_ITEM] || model(SCHEMA_NAMES.CART_ITEM, CartItemSchema)
);

const Cart = new DBCrud<typeof CartSchema>(
  models[SCHEMA_NAMES.CART] || model(SCHEMA_NAMES.CART, CartSchema)
);

export { Cart, CartItem };
