import ResponseHandler from "@/core/response.handler";
import { User } from "@/modules";
import { hashData } from "@/utils/helpers";
import { JWT } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const formData = await request.formData();

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!password || !email) return ResponseHandler.error("Invalid credentials");

  // Check if user exists in user table
  const user = await User.findOne({ email });
  if (!user?.id) return ResponseHandler.error(null, "Invalid credentials", 401);

  // Hash the password
  const hashedPassword = hashData(password, email);

  // Verify the password with the stored user.password
  if (user.get("password") !== hashedPassword)
    return ResponseHandler.error(
      { p: user.get("password"), hashedPassword },
      "Invalid credentials 2",
      401
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
