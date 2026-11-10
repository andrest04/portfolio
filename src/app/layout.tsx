import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Archivo } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { ErrorCopyProvider } from "@/components/layout/ErrorCopyProvider";
import SiteFooter from "@/components/layout/SiteFooter";
import { getDictionary, type Locale } from "@/lib/i18n";
import { personJsonLd, SITE_URL } from "@/lib/site";

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

/**
 * Runs before first paint. `js` switches the rail from its script-free form to the bar and
 * marker; `motion` allows the start states of the settle animation. If the page has not
 * hydrated after the wait, `motion` is taken back so nothing stays out of place.
 */
const SCRIPT_GATE = `(function(){var r=document.documentElement;r.classList.add("js","motion");setTimeout(function(){if(!r.dataset.motion)r.classList.remove("motion")},3000)})();`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const { meta } = await getDictionary(locale);
  const isEn = locale === "en";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL),
    alternates: { canonical: "/" },
    title: meta.title,
    description: meta.description,

    keywords: isEn
      ? ["Andrés Torres", "software engineering student", "portfolio", "Lima", "Peru"]
      : ["Andrés Torres", "estudiante de ingeniería de software", "portafolio", "Lima", "Perú"],

    authors: [{ name: "Andrés Torres" }],

    openGraph: {
      title: meta.title,
      description: meta.description,
      url: SITE_URL,
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
    <html lang={locale} className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_GATE }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd(t) }} />
      </head>
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
