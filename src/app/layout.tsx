import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Literata } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { ErrorCopyProvider } from "@/components/layout/ErrorCopyProvider";
import SiteFooter from "@/components/layout/SiteFooter";
import { getDictionary, type Locale } from "@/lib/i18n";

const literata = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

/**
 * Runs before first paint so hidden start states only apply when script is available,
 * and lifts them again if the app never hydrates.
 */
const MOTION_GATE = `(function(){var r=document.documentElement;r.classList.add("js");setTimeout(function(){if(!r.dataset.reveal)r.classList.remove("js")},4000)})();`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEn = locale === "en";

  const title = isEn
    ? "Andrés Torres - Software Engineer | .NET, React, Node.js"
    : "Andrés Torres - Ingeniero de Software | .NET, React, Node.js";

  const description = isEn
    ? "Portfolio of Andrés Torres, Software Engineer specialized in .NET 8, React, Node.js and MySQL. 8th term Software Engineering student in Peru building scalable systems with Clean Architecture, DDD, and CQRS."
    : "Portfolio de Andrés Torres, ingeniero de software especializado en .NET 8, React, Node.js y MySQL. Estudiante de 8.º ciclo de Ingeniería de Software en Perú construyendo sistemas escalables con Clean Architecture, DDD y CQRS.";

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ??
        (process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"),
    ),
    title,
    description,

    keywords: isEn
      ? [
          "full-stack developer",
          "software engineer",
          ".NET",
          "React",
          "Node.js",
          "MySQL",
          "Clean Architecture",
          "DDD",
          "CQRS",
          "Peru",
          "Lima",
        ]
      : [
          "desarrollador full-stack",
          "ingeniero software",
          ".NET",
          "React",
          "Node.js",
          "MySQL",
          "Clean Architecture",
          "DDD",
          "CQRS",
          "Perú",
          "Lima",
        ],

    authors: [{ name: "Andrés Torres" }],

    openGraph: {
      title,
      description,
      url: "https://andres-torres.com",
      siteName: "Andrés Torres Portfolio",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      locale: isEn ? "en_US" : "es_ES",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_GATE }} />
      </head>
      <body className={literata.className}>
        <a href="#content" className="skip-link">
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
