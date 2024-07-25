import ResponseHandler from "@/core/response.handler";
import { Artist } from "@/modules";
import { searchParamsToObject } from "@/utils/helpers";
import type { NextRequest } from "next/server";

/** /api/artists/filter */
export async function GET(req: NextRequest) {
  const { nextUrl: { searchParams } } = req;
  const query = searchParamsToObject(searchParams);
  const { page, limit, ...restQuery } = query;

  // Pagination logic
  if (page || limit) {
    const { results, total } = await Artist.paginate({ ...restQuery }, parseInt(page, 10), parseInt(limit, 10));
    return ResponseHandler.success({ results, total, page, limit });
  }

  // Filtering logic without pagination
  const artworks = await Artist.findAll({ ...restQuery });
  return ResponseHandler.success(artworks);
}
