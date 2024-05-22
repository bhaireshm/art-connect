import { Schema, model } from "mongoose";
import { SCHEMA_NAMES } from "@/utils/constants";

const artistSchema = new Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  background: String,
  gallery: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTWORK }],
  availableArtworks: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTWORK }],
});

export const Artist = model(SCHEMA_NAMES.ARTIST, artistSchema);
