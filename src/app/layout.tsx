import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getDictionary } from "@/lib/i18n";
import ThemeProvider from "@/components/providers/ThemeProvider";
import ThemeScript from "@/components/providers/ThemeScript";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEn = locale === "en";

  const title = isEn
    ? "Andrés Torres - Full-Stack Developer | .NET, React, Node.js"
    : "Andrés Torres - Desarrollador Full-Stack | .NET, React, Node.js";

  const description = isEn
    ? "Portfolio of Andrés Torres, Full-Stack Developer specialized in .NET 8, React, Node.js and PostgreSQL. 7th term Software Engineering student in Peru building scalable systems with Clean Architecture, DDD, and CQRS."
    : "Portfolio de Andrés Torres, desarrollador Full-Stack especializado en .NET 8, React, Node.js y PostgreSQL. Estudiante de 7mo término de Ingeniería de Software en Perú construyendo sistemas escalables con Clean Architecture, DDD y CQRS.";

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
          "PostgreSQL",
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
          "PostgreSQL",
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
  const locale = await getLocale();
  const t = await getDictionary(locale as "es" | "en");

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[rgb(var(--bg))] text-text-secondary`}
      >
        <NextIntlClientProvider locale={locale} messages={t}>
          <ThemeProvider>
            <a
              href="#hero"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg"
            >
              {locale === "es" ? "Ir al contenido" : "Skip to content"}
            </a>
            <div className="flex min-h-screen flex-col">
              <Navbar t={t} />
              <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 sm:px-6 lg:px-8">
                {children}
              </main>
              <Footer t={t} />
            </div>
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
