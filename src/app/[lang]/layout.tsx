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

  return {
    title: isEn ? "Andrés Torres | Portfolio" : "Andrés Torres | Portafolio",
    description: isEn
      ? "Software Engineering student building scalable systems with Clean Architecture, DDD, and CQRS."
      : "Estudiante de Ingeniería de Software construyendo sistemas escalables con Clean Architecture, DDD y CQRS.",
    openGraph: {
      title: isEn ? "Andrés Torres | Portfolio" : "Andrés Torres | Portafolio",
      description: isEn
        ? "Full-stack projects with strong architecture and delivery."
        : "Proyectos full-stack con enfoque en arquitectura y entrega.",
      url: "https://andres-torres.com",
      siteName: "Andrés Torres",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Andrés Torres Portfolio",
        },
      ],
      type: "website",
      locale: isEn ? "en_US" : "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "Andrés Torres | Portfolio" : "Andrés Torres | Portafolio",
      description: isEn
        ? "Software Engineering student building scalable systems."
        : "Estudiante de Ingeniería de Software construyendo sistemas escalables.",
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
