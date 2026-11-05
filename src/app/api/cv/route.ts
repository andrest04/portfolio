import { NextRequest, NextResponse } from "next/server";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import { CONTACT } from "@/lib/contact";
import { getDictionary, i18n, LOCALE_COOKIE } from "@/lib/i18n";

const DOWNLOAD_NAME = "Andres_Torres_CV_Software_Engineer.pdf";

async function readableFailure(request: NextRequest, reason: "missing" | "failed", status: number) {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = i18n.locales.find((candidate) => candidate === cookie) ?? i18n.defaultLocale;
  const { cv } = await getDictionary(locale);

  return new NextResponse(`${cv[reason]} ${CONTACT.email}`, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function GET(request: NextRequest) {
  try {
    const publicDir = join(process.cwd(), "public");
    const files = await readdir(publicDir);
    const pdfFile = files.find((file) => file.toLowerCase().endsWith(".pdf"));

    if (!pdfFile) {
      return readableFailure(request, "missing", 404);
    }

    const pdf = await readFile(join(publicDir, pdfFile));

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${DOWNLOAD_NAME}"`,
      },
    });
  } catch {
    return readableFailure(request, "failed", 500);
  }
}
