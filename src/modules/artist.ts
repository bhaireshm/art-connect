import { DB, DBCrud } from "@/database";
import { SCHEMA_NAMES } from "@/utils/constants";
import { Schema, model, models } from "mongoose";

export const ArtistSchema = new Schema(
  {
    name: {
      type: String,
    },
    bio: { type: String, required: true },
    background: String,
    gallery: [{ type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTWORK }],
    availableArtworks: [
      { type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.ARTWORK },
    ],
  },
  DB.getDefaultSchemaOptions(),
);

const Artist = new DBCrud<typeof ArtistSchema>(
  models[SCHEMA_NAMES.ARTIST] || model(SCHEMA_NAMES.ARTIST, ArtistSchema),
);

export default Artist;
