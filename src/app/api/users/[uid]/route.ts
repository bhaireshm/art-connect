import ResponseHandler from "@/core/response.handler";
import DatabaseError from "@/database/db.error";
import { User } from "@/modules";
import type { Params } from "@/types";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: Params<"uid">) {
  const userId = params.uid;
  if (!userId) return NextResponse.json({ error: "Missing user ID" }, ResponseHandler.status(400));

  const user = await User.findOne({ _id: userId });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ data: user }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("uid");
    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
    const data = await req.json();
    const user = await User.update({ _id: userId }, data);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ data: user });
  } catch (error) {
    const err = new DatabaseError(error).format();
    return NextResponse.json(err, { status: err.status });
  }
}

export async function DELETE(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("iid");
  if (!userId) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }
  const user = await User.delete({ _id: userId });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ data: user });
}
