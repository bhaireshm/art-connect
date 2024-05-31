import { SCHEMA_NAMES } from "@/utils/constants";
import { Schema, model } from "mongoose";

const artistSchema = new Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  background: String,
  gallery: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTWORK }],
  availableArtworks: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTWORK }],
});

const Artist = model(SCHEMA_NAMES.ARTIST, artistSchema);
export default Artist;
