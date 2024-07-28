import { COOKIE } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["https://*.github.com", "http://localhost"];
const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const isPreflight = request.method === "OPTIONS";

  console.log("Middleware....");

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  const response = NextResponse.next();
  if (isAllowedOrigin)
    response.headers.set("Access-Control-Allow-Origin", origin);

  Object.entries(corsOptions).forEach(([key, value]) =>
    response.headers.set(key, value)
  );

  const userToken = request.cookies.get(COOKIE.name);
  // const userToken = cookies().get(COOKIE.name)?.value;
  const loginUrl = new URL("/login", request.url);

  if (!userToken && !request.nextUrl.pathname.startsWith("/login"))
    return NextResponse.redirect(loginUrl);

  if (!userToken) return NextResponse.redirect(loginUrl);

  return response;
}

export const config = {
  matcher: ["/(?!api)", "/cart", "/wishlist"],
};
