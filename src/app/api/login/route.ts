import ResponseHandler from "@/core/response.handler";
import { User } from "@/modules";
import { MESSAGES } from "@/utils/constants";
import { hashData } from "@/utils/helpers";
import { JWT } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const contentType = request.headers.get("content-type");
  let data: { email: string; password: string };

  // Accepts both json and/or form-data

  if (contentType?.includes("application/json")) 
    data = await request.json();
   else if (contentType?.includes("multipart/form-data")) {
    const formData = await request.formData();
    data = {
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
    };
  } else 
    return NextResponse.json({ error: "Unsupported content type" }, { status: 400 });
  

  if (!data.password || !data.email) return ResponseHandler.error(MESSAGES.INVALID_CREDENTIALS);
  const { email, password } = data;

  // Check if user exists in user table
  const user = await User.findOne({ email });
  if (!user?.id) return ResponseHandler.error(null, MESSAGES.INVALID_CREDENTIALS, 401);

  // Hash the password
  const storedPassword = user.get("password");
  const hashedPassword = hashData(password, email);

  // Verify the password with the stored user.password
  if (storedPassword !== hashedPassword)
    return ResponseHandler.error(
      { storedPassword, hashedPassword, user },
      MESSAGES.INVALID_CREDENTIALS,
      401,
    );

  // Generate the token
  const userTokenData = {
    email,
    username: user.get("username"),
    id: user.get("id"),
  };
  const token = await JWT.createJwt(userTokenData);

  return ResponseHandler.success({ token, user: userTokenData }, 200, response);
}
