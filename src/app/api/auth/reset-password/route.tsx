import { ResponseHandler } from "@/core";
import { User } from "@/modules";
import { MESSAGES, PROJECT_NAME, STATUS_CODES } from "@/utils/constants";
import { sendEmail } from "@/utils/email";
import { hashData } from "@/utils/helpers";
import { JWT } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth/reset-password
 *
 * This route is used for both forgot password and reset/update password.
 */
export async function POST(request: NextRequest, response: NextResponse) {
  const contentType = request.headers.get("content-type");
  let data: Record<string, any>;

  // Accepts both json and/or form-data
  if (contentType?.includes("application/json")) data = await request.json();
  else if (contentType?.includes("multipart/form-data")) {
    const formData = await request.formData();
    data = Object.fromEntries(formData);
  } else return ResponseHandler.error(STATUS_CODES[415], 415);

  const { email, newPassword, resetToken } = data;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) return ResponseHandler.error(null, MESSAGES.USER_NOT_FOUND, 404);

  // If resetToken is provided, it's a password reset request
  if (resetToken) {
    // Verify reset token
    const isValidToken = await verifyResetToken(user.id, resetToken);
    if (!isValidToken) return ResponseHandler.error(null, MESSAGES.INVALID_TOKEN, 400);

    // Update password
    const hashedPassword = hashData(newPassword, email);
    await User.updateById(user.id, { password: hashedPassword } as any);

    // TODO: remove/reset token from header/cookie/localstorage

    return ResponseHandler.success({ message: MESSAGES.USER_PASSWORD_CHANGED }, 200, response);
  }

  // If no resetToken, it's a forgot password request, Generate and send reset token
  const newResetToken = await generateResetToken(user.id);
  const mailResponse = await sendResetEmail(email, newResetToken);
  return ResponseHandler.success(mailResponse?.message || MESSAGES.USER_PASSWORD_RESET);
}

async function verifyResetToken(userId: string, token: string): Promise<boolean> {
  try {
    const verified = await JWT.verifyJwt(token);
    return verified.payload.sub === userId;
  } catch (error) {
    console.error("Error verifying reset token:", error);
    return false;
  }
}

async function generateResetToken(userId: string): Promise<string> {
  const token = await JWT.createJwt({ sub: userId }, { expiresIn: "1h" });
  // Store the token in cookies/localstorage
  return token;
}

async function sendResetEmail(email: string, token: string) {
  const resetLink = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/auth/reset-password?token=${token}`;
  const subject = `${PROJECT_NAME} - Reset Your Password`;
  const html = `
    <h1>Reset Your Password</h1>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>This link will expire in 1 hour.</p>
  `;

  const res = await sendEmail({ to: email, subject, html });
  return res;
}
