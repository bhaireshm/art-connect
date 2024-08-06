import { type NextRequest } from "next/server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Artist } from "@/modules";
import type { Params } from "@/types";

const aid = "aid";

export async function GET(req: NextRequest, { params }: Params<typeof aid>) {
  const artistId = params.aid;
  if (!artistId) return ResponseHandler.error({ artistId }, "Missing/Invalid artist ID", 400);

  const artist = await Artist.findById(artistId);
  if (!artist) return ResponseHandler.error({ artist, artistId }, "Artist not found", 404);

  return ResponseHandler.success(artist);
}

export async function PUT(req: NextRequest, { params }: Params<typeof aid>) {
  try {
    const artistId = params.aid;
    if (!artistId) return ResponseHandler.error({ artistId }, "Missing/Invalid artist ID", 400);

    const data = await req.json();
    const artist = await Artist.updateById(artistId, data);
    if (!artist) return ResponseHandler.error(artistId, "Artist not found", 404);

    return ResponseHandler.success(artist, "Artist details updated");
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.message, err.code);
  }
}

export async function DELETE(req: NextRequest, { params }: Params<typeof aid>) {
  const artistId = params.aid;
  if (!artistId) return ResponseHandler.error({ artistId }, "Missing/Invalid artist ID", 400);

  const artist = await Artist.delete({ _id: artistId });
  if (artist.deletedCount) return ResponseHandler.error({ artist }, "Artist not found", 404);

  return ResponseHandler.success(artist, "Artist deleted", 202);
}
