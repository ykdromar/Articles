import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthPath = path === "/login" || path === "/signup";
  const isEditorPath =
    path === "/editor/create" || path === "/api/editor/create";
  const token = request.cookies.get("token");
  let role = request.cookies.get("role")?.value.toString() || "reader";
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if ((token === undefined || token === null) && isEditorPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && isEditorPath && role != "editor") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/signup", "/editor/:path*", "/api/editor/:path*"],
};
