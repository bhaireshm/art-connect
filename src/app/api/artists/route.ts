"use server";

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments
import { NextRequest } from "next/server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Artist } from "@/modules";

/** /api/artists/ */
export async function GET() {
  const artists = await Artist.populate({}, ["availableArtworks", "gallery"]);
  return ResponseHandler.success(artists);
}

/** /api/artists/ */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Create artist
    const artist = await Artist.create(data);

    return ResponseHandler.success(artist, 201);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}
