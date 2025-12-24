import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import { getDictionary } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";

  const title = isEn
    ? "Andrés Torres - Full-Stack Developer | .NET, React, Node.js"
    : "Andrés Torres - Desarrollador Full-Stack | .NET, React, Node.js";

  const description = isEn
    ? "Portfolio of Andrés Torres, Full-Stack Developer specialized in .NET 8, React, Node.js and PostgreSQL. 7th term Software Engineering student in Peru building scalable systems with Clean Architecture, DDD, and CQRS."
    : "Portfolio de Andrés Torres, desarrollador Full-Stack especializado en .NET 8, React, Node.js y PostgreSQL. Estudiante de 7mo término de Ingeniería de Software en Perú construyendo sistemas escalables con Clean Architecture, DDD y CQRS.";

  return {
    title,
    description,

    keywords: isEn
      ? ["full-stack developer", "software engineer", ".NET", "React", "Node.js", "PostgreSQL", "Clean Architecture", "DDD", "CQRS", "Peru", "Lima"]
      : ["desarrollador full-stack", "ingeniero software", ".NET", "React", "Node.js", "PostgreSQL", "Clean Architecture", "DDD", "CQRS", "Perú", "Lima"],

    authors: [{ name: "Andrés Torres" }],

    openGraph: {
      title,
      description,
      url: isEn ? "https://andres-torres.com/en" : "https://andres-torres.com/es",
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

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang as "es" | "en");

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[rgb(var(--bg))] text-[rgba(var(--text),0.92)]`}>
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[rgba(var(--primary),0.18)] blur-[120px]" />
          <div className="absolute top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[rgba(var(--primary-glow),0.10)] blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>

        <div className="flex min-h-screen flex-col">
          <Navbar lang={lang as "es" | "en"} t={t} />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
