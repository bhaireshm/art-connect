import { ResponseHandler } from "@/core";
import { User } from "@/modules";
import { updateArtistInfo } from "@/modules/user";
import { COOKIE, MESSAGES } from "@/utils/constants";
import { hashData } from "@/utils/helpers";
import { JWT } from "@/utils/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * 
 * POST /api/auth/register
 */
export async function POST(request: NextRequest, response: NextResponse) {
  const contentType = request.headers.get("content-type");
  let data: Record<string, any>;

  // Accepts both json and/or form-data
  if (contentType?.includes("application/json"))
    data = await request.json();
  else if (contentType?.includes("multipart/form-data")) {
    const formData = await request.formData();
    data = Array.from(formData.entries()).map(([k, v]) => ({ [k]: v }));
  } else
    return NextResponse.json({ error: "Unsupported content type" }, { status: 400 });

  const { email, password, username, ...restPayload } = data;

  // Check if user exists in user table
  const isUserExists = await User.findOne({ email });
  if (isUserExists?.id) return ResponseHandler.error(null, MESSAGES.USER_ALREADY_EXISTS, 409);

  // Hash the password
  const hashedPassword = hashData(password, email);

  // Create user
  const userPayload: any = {
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
    ...restPayload
  };
  const newUser: any = await User.create(userPayload);
  updateArtistInfo({ type: newUser.type, userId: newUser.id, payload: { name: userPayload.username } });

  // Generate the token
  const { password: _, ...userRestData }: any = newUser;
  const userTokenData = {
    email,
    username,
    id: newUser?.id,
  };
  const token = await JWT.createJwt(userTokenData);
  cookies().set(COOKIE.name, token, COOKIE.serializeOptions);

  return ResponseHandler.success({ token, user: userRestData }, 200, response);
}
