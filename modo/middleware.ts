import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/my-page/orders",
  "/my-page/reviews",
  "/my-cart",
  "/my-like",
  "/checkout",
];

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isProtectedRoute = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (isProtectedRoute && !refreshToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/my-page/:path*",
    "/my-page",
    "/my-cart/:path*",
    "/my-cart",
    "/my-like/:path*",
    "/my-like",
    "/checkout/:path*",
    "/checkout",
  ],
};
