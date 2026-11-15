import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { CONTACT } from "@/lib/contact";
import { getDictionary, i18n, LOCALE_COOKIE, type Locale } from "@/lib/i18n";

const DOWNLOAD_NAME = "Andres_Torres_CV.pdf";

const CV_FILES: Record<Locale, string> = {
  es: "Andres_Torres_CV_es.pdf",
  en: "Andres_Torres_CV_en.pdf",
};

function requestLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  return i18n.locales.find((candidate) => candidate === cookie) ?? i18n.defaultLocale;
}

async function readableFailure(locale: Locale, reason: "missing" | "failed", status: number) {
  const { cv } = await getDictionary(locale);

  return new NextResponse(`${cv[reason]} ${CONTACT.email}`, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function GET(request: NextRequest) {
  const locale = requestLocale(request);

  try {
    const pdf = await readFile(join(process.cwd(), "public", CV_FILES[locale]));

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${DOWNLOAD_NAME}"`,
        "Cache-Control": "private, no-store",
        Vary: "Cookie",
      },
    });
  } catch (error) {
    const missing = (error as NodeJS.ErrnoException).code === "ENOENT";
    return readableFailure(locale, missing ? "missing" : "failed", missing ? 404 : 500);
  }
}
