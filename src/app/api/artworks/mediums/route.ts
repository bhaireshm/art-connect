import { ResponseHandler } from "@/core";
import { Artwork } from "@/modules";

/** /api/artworks/mediums */
export async function GET() {
  const artworks = await Artwork.m.find({}, { medium: 1 }).distinct("medium");
  return ResponseHandler.success(artworks);
}
