import { NextRequest, NextResponse } from "next/server";
import { LOCALE_COOKIE } from "@/lib/i18n";

type Lang = "es" | "en";

function detectLang(req: NextRequest): Lang {
  const header = req.headers.get("accept-language") || "";
  const first = header.split(",")[0]?.toLowerCase() || "";

  const base = first.split("-")[0];

  if (base === "en") return "en";
  return "es";
}

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (req.cookies.get(LOCALE_COOKIE)) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  res.cookies.set(LOCALE_COOKIE, detectLang(req), { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
