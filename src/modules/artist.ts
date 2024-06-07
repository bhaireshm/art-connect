import Database from "@/database/database";
import { SCHEMA_NAMES } from "@/utils/constants";
import { Schema, model, models } from "mongoose";

const artistSchema = new Schema(
  {
    name: {
      type: String,
    },
    bio: { type: String, required: true },
    background: String,
    gallery: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTWORK }],
    availableArtworks: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTWORK }],
  },
  Database.getDefaultSchemaOptions(),
);

export default models[SCHEMA_NAMES.ARTIST] || model(SCHEMA_NAMES.ARTIST, artistSchema);