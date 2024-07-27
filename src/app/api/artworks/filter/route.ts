import { ResponseHandler } from "@/core";
import { Artwork } from "@/modules";
import { searchParamsToObject } from "@/utils/helpers";
import type { NextRequest } from "next/server";

/** /api/artworks/filter */
export async function GET(req: NextRequest) {
  const { nextUrl: { searchParams } } = req;
  const query = searchParamsToObject(searchParams);
  const { page, limit, ...restQuery } = query;

  // Pagination logic
  if (page || limit) {
    const { results, total } = await Artwork.paginate({ ...restQuery }, parseInt(page, 10), parseInt(limit, 10));
    return ResponseHandler.success({ results, total, page, limit });
  }

  // Filtering logic without pagination
  const artworks = await Artwork.findAll({ ...restQuery });
  return ResponseHandler.success(artworks);
}
