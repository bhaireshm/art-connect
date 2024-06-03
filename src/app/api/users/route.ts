"use server";

import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://dummyjson.com/users?limit=2");
  const data = await res.json();
  return NextResponse.json({ data });
}
