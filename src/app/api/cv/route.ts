import { NextRequest, NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { join } from "path";

export async function GET(request: NextRequest) {
  try {
    const publicDir = join(process.cwd(), "public");
    const files = await readdir(publicDir);

    const pdfFile = files.find((file) => file.toLowerCase().endsWith(".pdf"));

    if (!pdfFile) {
      return NextResponse.json(
        { error: "No PDF file found" },
        { status: 404 }
      );
    }

    const url = new URL(`/${pdfFile}`, request.url);
    return NextResponse.redirect(url);
  } catch {
    return NextResponse.json(
      { error: "Error reading files" },
      { status: 500 }
    );
  }
}
