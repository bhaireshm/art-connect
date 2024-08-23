"use server";

import { ResponseHandler } from "@/core";
import DatabaseError from "@/database/db.error";
import { Artwork } from "@/modules";
import type { Params } from "@/types";
import { isEmpty } from "@bhaireshm/ez.js";
import { type NextRequest } from "next/server";

const awid = "awid";

export async function GET(req: NextRequest, { params }: Params<typeof awid>) {
  const awId = params.awid;
  if (!awId) return ResponseHandler.error({ awId }, "Missing/Invalid artwork ID", 400);

  const artwork = await Artwork.populate({ _id: awId }, ["artist", "relatedArtworks"]);
  if (isEmpty(artwork)) return ResponseHandler.error({ artwork, awId }, "Artwork not found", 404);

  return ResponseHandler.success(artwork);
}

export async function PUT(req: NextRequest, { params }: Params<typeof awid>) {
  try {
    const awId = params.awid;
    if (!awId) return ResponseHandler.error({ awId }, "Missing/Invalid artwork ID", 400);

    const data = await req.json();
    const artwork = await Artwork.updateById(awId, data);
    if (!artwork) return ResponseHandler.error(awId, "Artwork not found", 404);

    return ResponseHandler.success(artwork, "Artwork details updated");
  } catch (error) {
    const err = new DatabaseError(error);
    return ResponseHandler.error(err, err.message, err.code);
  }
}

export async function DELETE(req: NextRequest, { params }: Params<typeof awid>) {
  const awId = params.awid;
  if (!awId) return ResponseHandler.error({ awId }, "Missing/Invalid artwork ID", 400);

  const artwork = await Artwork.delete({ _id: awId });
  if (artwork.deletedCount) return ResponseHandler.error({ artwork }, "Artwork not found", 404);

  return ResponseHandler.success(artwork, "Artwork deleted", 202);
}
