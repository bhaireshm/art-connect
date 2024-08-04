import { DB, DBCrud } from "@/database";
import { User as UserType } from "@/types";
import { SCHEMA_NAMES } from "@/utils/constants";
import mongoose, { model, models, Schema } from "mongoose";
import { addressSchema } from "./address";
import Artist from "./artist";

export const UserSchema = new mongoose.Schema(
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
      // select: false,
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
    orderHistory: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ORDER }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTWORK }],
    type: {
      type: String,
      default: SCHEMA_NAMES.USER,
      enum: [SCHEMA_NAMES.USER, SCHEMA_NAMES.ARTIST],
    },
    artistInfo: {
      type: Schema.Types.ObjectId,
      ref: SCHEMA_NAMES.ARTIST,
    }, // artistInfoId if type is "Artist"
  },
  DB.getDefaultSchemaOptions()
);

const User = new DBCrud<typeof UserSchema>(
  models[SCHEMA_NAMES.USER] || model(SCHEMA_NAMES.USER, UserSchema),
);

export default User;

type UpdateArtistInfoTypes = {
  type: UserType["type"];
  userId: string;
  payload: any;
};

export async function updateArtistInfo({ type, userId, payload }: UpdateArtistInfoTypes) {
  if (type === SCHEMA_NAMES.ARTIST) {
    const artist: any = await Artist.create(payload);

    if (artist?.id) {
      const userUpdateData: any = { "artistInfo": artist.id };
      User.updateById(userId, userUpdateData).then(() => {
        console.log("user's type is artist, updating artistInfoId to", artist.id);
      });
    }
  }
};