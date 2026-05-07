import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./lib/i18n";
import { getToken } from "next-auth/jwt";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Remove locale prefix
  const pathnameWithoutLocale = pathname.replace(
    /^\/(en|hi)/,
    ""
  );

  // Protected admin routes
  if (pathnameWithoutLocale.startsWith("/admin")) {
    
    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/login", req.url)
      );
    }

    
    if (token.role !== "admin") {
      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }
  }

  // Prevent logged-in users from visiting auth pages
  const authRoutes = ["/auth/login", "/auth/register"];

  if (
    token &&
    authRoutes.includes(pathnameWithoutLocale)
  ) {
    // Redirect ONLY when visiting auth pages
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  
  }

  //  Continue intl middleware
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};