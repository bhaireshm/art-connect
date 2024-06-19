import { DB, DBCrud } from "@/database";
import { SCHEMA_NAMES } from "@/utils/constants";
import { Schema, model, models } from "mongoose";

// 3. Artwork Schema
const artworkSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  dimensions: {
    height: Number,
    width: Number,
    depth: Number,
  },
  medium: String,
  images: [String], // URLs to high-resolution images
  price: { type: Number, required: true },
  artist: {
    type: Schema.Types.ObjectId,
    ref: SCHEMA_NAMES.ARTIST,
    required: true,
  },
  relatedArtworks: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTWORK }],
}, DB.getDefaultSchemaOptions());

const Artwork = new DBCrud<typeof artworkSchema>(
  models[SCHEMA_NAMES.ARTWORK] || model(SCHEMA_NAMES.ARTWORK, artworkSchema),
);
export default Artwork;
