import { ResponseHandler } from "@/core";
import { Artist } from "@/modules";
import { searchParamsToObject } from "@/utils/helpers";
import type { NextRequest } from "next/server";

/** /api/artists/filter */
export async function GET(req: NextRequest) {
  const { nextUrl: { searchParams } } = req;
  const query = searchParamsToObject(searchParams);
  const { page, limit, searchTerm = "", ...restQuery } = query;

  // Pagination logic
  if (page || limit) {
    let pipeline = {};

    if (searchTerm) {
      const regex = { $regex: `.*${searchTerm}.*`, $options: "i" };
      pipeline = {
        $or: [
          { title: regex },
          { description: regex },
          { medium: regex }
        ]
      };
    } else pipeline = restQuery;

    const { results, total } = await Artist.paginate(pipeline, parseInt(page, 10), parseInt(limit, 10));
    return ResponseHandler.success({ results, total, page, limit });
  }

  // Filtering logic without pagination
  const artists = await Artist.findAll(restQuery);
  return ResponseHandler.success(artists);
}
