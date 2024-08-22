import { ResponseHandler } from "@/core";
import { Artwork } from "@/modules";
import { uniqueArrayOfObjects } from "@bhairesh/ez.js";

/** /api/artworks/mediums */
export async function GET() {
  const artworks = await Artwork.findAll({}, { medium: 1 });
  if (artworks.length === 0) return ResponseHandler.success([], "No artwork mediums found");
  return ResponseHandler.success(uniqueArrayOfObjects(artworks.map((m: any) => m.medium)));
}
