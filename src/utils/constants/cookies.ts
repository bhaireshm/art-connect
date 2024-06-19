import type { CookieSerializeOptions } from "cookie";

export const COOKIE = Object.freeze({
  name: "art-connect-token",
  serializeOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "strict",
    httpOnly: true,
    path: "/",
  } as CookieSerializeOptions,
});

