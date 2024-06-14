import Database from "@/database/database";
import DatabaseCRUD from "@/database/db.crud";
import { SCHEMA_NAMES } from "@/utils/constants";
import mongoose, { model, models, Schema } from "mongoose";
import { addressSchema } from "./address";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    socialAccounts: {
      google: String,
      facebook: String,
    },
    profile: {
      firstName: String,
      lastName: String,
      address: addressSchema,
    },
    // orderHistory: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ORDER }],
    // wishlist: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTWORK }],
    type: [SCHEMA_NAMES.USER, SCHEMA_NAMES.ARTIST],
    artistInfo: {
      type: Schema.Types.ObjectId,
      ref: SCHEMA_NAMES.ARTIST,
      // eslint-disable-next-line object-shorthand, func-names
      // required: function () {
      //   return this.type === SCHEMA_NAMES.ARTIST;
      // },
    }, // artistInfoId if type is "Artist"
  },
  Database.getDefaultSchemaOptions(),
);

const User = new DatabaseCRUD<typeof userSchema>(
  models[SCHEMA_NAMES.USER] || model(SCHEMA_NAMES.USER, userSchema),
);
export default User;
