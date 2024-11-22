import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./app/lib/session";

export const config = {
  matcher: ["/", "/login", "/register"],
};

export async function middleware(request: NextRequest) {
  const isAuthenticated = await isAuth();

  if (request.nextUrl.pathname === "/" && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register")) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

async function isAuth() {
  const jwt = (await cookies()).get("jwt")?.value;
  const payload = await decrypt(jwt);
  return Boolean(payload);
}
