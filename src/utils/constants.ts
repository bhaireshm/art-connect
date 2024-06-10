import type { CookieSerializeOptions } from "cookie";
import type { ValueOf } from "next/dist/shared/lib/constants";

export const PROJECT_NAME = "ArtConnect";

export const SCHEMA_NAMES = Object.freeze({
  USER: "Users",
  ARTIST: "Artists",
  ARTWORK: "Artworks",
  ORDER: "Orders",
  CART: "Carts",
  PAGE_CONTENT: "PageContents",
  ADMIN_DASHBOARD: "AdminDashboard",
});

export const STATUS_CODES: { [key: number]: string } = {
  // Informational responses (100–199)
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",

  // Successful responses (200–299)
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",

  // Redirection messages (300–399)
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",

  // Client error responses (400–499)
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",

  // Server error responses (500–599)
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required",
};

const STATUS_TEXT: Record<ValueOf<typeof STATUS_CODES>, keyof typeof STATUS_CODES> = {};

Object.entries(STATUS_CODES).forEach(([code, text]) => {
  STATUS_TEXT[text.toUpperCase().replace(/'/g, "").replace(/[ -]/g, "_")] = +code;
});

export { STATUS_TEXT };

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

export const ROUTES = {
  ABOUTUS: { label: "About Us", path: "/about" },
  ADD_TO_CART: { label: "Add to Cart", path: "/addtocart" },
  ADMIN: { label: "Admin", path: "/admin" },
  ARTWORK: { label: "Artwork", path: "/artwork" },
  CONTACTUS: { label: "Contact Us", path: "/contact" },
  CREATEITEM: { label: "Create Item", path: "/create" },
  CART: { label: "Cart", path: "/cart" },
  DISCOVER: { label: "Discover", path: "/discover" },
  HOME: { label: "Home", path: "/" },
  HOTBID: { label: "Hot Bid", path: "/hotbid" },
  LOGIN: { label: "Login", path: "/login" },
  LOGOUT: { label: "Logout", path: "/logout" },
  ORDER: { label: "Order", path: "/order" },
  PROFILE: { label: "Profile", path: "/profile" },
  SIGNUP: { label: "Signup", path: "/signup" },
};
