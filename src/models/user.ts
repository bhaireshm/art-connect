import { randomUUID } from "crypto";
import { model, Schema } from "mongoose";
import { SCHEMA_NAMES } from "@/utils/constants";
import { addressSchema } from "./address";

const userSchema = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    default: () => randomUUID(),
  },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  socialAccounts: {
    google: String,
    facebook: String,
  },
  profile: {
    firstName: String,
    lastName: String,
    address: addressSchema,
  },
  // orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  // wishlist: [{ type: Schema.Types.ObjectId, ref: "Artwork" }],
  type: {
    enum: [SCHEMA_NAMES.USER, SCHEMA_NAMES.ARTIST],
    required: true,
  },
  artistInfo: {
    type: Schema.Types.ObjectId,
    ref: SCHEMA_NAMES.ARTIST,
    // eslint-disable-next-line object-shorthand, func-names
    // required: function () {
    //   return this.type === SCHEMA_NAMES.ARTIST;
    // },
  }, // artistInfoId if type is "Artist"
});

const User = model(SCHEMA_NAMES.USER, userSchema);

export default User;
