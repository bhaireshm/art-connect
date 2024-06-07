import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["https://\\*.github.com", "http://localhost"];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function middleware(request: NextRequest) {
  /************ Allowed origin checks ends here ************/
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  const response = NextResponse.next();
  if (isAllowedOrigin) response.headers.set("Access-Control-Allow-Origin", origin);
  Object.entries(corsOptions).forEach(([key, value]) => response.headers.set(key, value));

  /************ Authentication using cookies ************/
  const userToken = request.cookies.get("user")?.value;
  const loginUrl = new URL("/login", request.url);

  if (!userToken && !request.nextUrl.pathname.startsWith("/login")) return NextResponse.redirect(loginUrl);
  if (!userToken) return NextResponse.redirect(loginUrl);

  return response;
}

export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  matcher: ["/login"],
};
