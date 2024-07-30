"use server";

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments
import { NextRequest } from "next/server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Artwork } from "@/modules";

/** /api/artworks/ */
export async function GET() {
  const artworks = await Artwork.populate({}, "artist");
  return ResponseHandler.success(artworks);
}

/** /api/artworks/ */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Create artwork
    const artwork = await Artwork.create(data);

    return ResponseHandler.success(artwork, 201);
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.code);
  }
}
