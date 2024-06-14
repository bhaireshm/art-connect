"use server";

import { DB } from "@/database";
import { NextResponse } from "next/server";

/** /api/ */
export async function GET() {
  const conn = await DB.connect();
  return NextResponse.json({
    message: `ArtConnect API runnning...${conn.name}`,
  });
}

// export async function POST() { }
