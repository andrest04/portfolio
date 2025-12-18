import { NextRequest, NextResponse } from "next/server";

const SUPPORTED = ["es", "en"] as const;
type Lang = (typeof SUPPORTED)[number];

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

  const hasLangPrefix = SUPPORTED.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLangPrefix) return NextResponse.next();

  const lang = detectLang(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
