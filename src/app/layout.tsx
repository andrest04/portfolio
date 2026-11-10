import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Archivo } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { ErrorCopyProvider } from "@/components/layout/ErrorCopyProvider";
import SiteFooter from "@/components/layout/SiteFooter";
import { getDictionary, type Locale } from "@/lib/i18n";

/** One variable family: the width axis separates display from text, the weight axis does the rest. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

/** Basalt: the tone of the rail, which is the first thing under the browser chrome on a phone. */
export const viewport: Viewport = {
  themeColor: "#1b1c1e",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const { meta } = await getDictionary(locale);
  const isEn = locale === "en";

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ??
        (process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"),
    ),
    title: meta.title,
    description: meta.description,

    keywords: isEn
      ? ["Andrés Torres", "software engineering student", "portfolio", "Lima", "Peru"]
      : ["Andrés Torres", "estudiante de ingeniería de software", "portafolio", "Lima", "Perú"],

    authors: [{ name: "Andrés Torres" }],

    openGraph: {
      title: meta.title,
      description: meta.description,
      url: "https://andres-torres.com",
      siteName: "Andrés Torres",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
      type: "website",
      locale: isEn ? "en_US" : "es_ES",
    },

    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og.png"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await getLocale()) as Locale;
  const t = await getDictionary(locale);

  return (
    <html lang={locale} className={archivo.variable}>
      <body>
        <a href="#main" className="skip-link">
          {t.meta.skipLink}
        </a>
        <ErrorCopyProvider copy={t.error}>{children}</ErrorCopyProvider>
        <SiteFooter t={t} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
