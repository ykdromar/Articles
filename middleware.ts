import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const unauthorizedPaths = ["/login", "/signup"];
  const editorPath = ["/editor", "/api/editor"];
  const token = request.cookies.get("token");
  let role = request.cookies.get("role")?.value.toString() || "reader";

  if (unauthorizedPaths.includes(path) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path.startsWith(editorPath[0]) || path.startsWith(editorPath[1])) {
    if (token == null || token == undefined || role != "editor") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/signup", "/editor/:path*", "/api/editor/:path*"],
};
