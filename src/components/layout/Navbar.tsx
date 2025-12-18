"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import { Menu, X } from "lucide-react";
import { Dictionary } from "@/types/i18n";

type NavbarProps = {
  lang: "es" | "en";
  t: Dictionary;
};

export default function Navbar({ lang, t }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const otherLang = lang === "es" ? "en" : "es";

  const switchHref = useMemo(() => {
    if (!pathname) return `/${otherLang}`;
    const parts = pathname.split("/");
    parts[1] = otherLang;
    return parts.join("/") || `/${otherLang}`;
  }, [pathname, otherLang]);

  const items = [
    { href: "#projects", label: t.nav.projects },
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#contact", label: t.nav.contact }
  ];

  return (
    <div className="sticky top-4 z-50 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <GlassCard
        variant="solid"
        className="flex items-center justify-between px-4 py-3 sm:px-5"
      >
        <a href="#" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[rgba(255,255,255,0.06)] text-sm font-semibold text-[rgba(255,255,255,0.92)] shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
            AT.
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[rgba(255,255,255,0.92)]">
              Andrés Torres
            </p>
            <p className="text-xs text-[rgba(255,255,255,0.70)]">
              {lang === "es" ? "Estudiante · Full-Stack" : "Student · Full-Stack"}
            </p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="text-[rgba(255,255,255,0.70)] transition hover:text-[rgba(255,255,255,0.92)]"
            >
              {it.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={switchHref}
            className="rounded-2xl border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.06)] px-3 py-2 text-xs font-medium text-[rgba(255,255,255,0.92)] backdrop-blur-[18px] transition hover:border-[rgba(255,255,255,0.22)] hover:bg-[rgba(255,255,255,0.09)]"
          >
            {lang.toUpperCase()} → {otherLang.toUpperCase()}
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-2xl border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.92)] backdrop-blur-[18px] transition hover:bg-[rgba(255,255,255,0.09)]"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </GlassCard>

      {open && (
        <div className="mt-3 md:hidden">
          <GlassCard variant="default" className="p-3">
            <div className="flex flex-col">
              {items.map((it) => (
                <a
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-[rgba(255,255,255,0.70)] hover:bg-[rgba(255,255,255,0.06)] hover:text-[rgba(255,255,255,0.92)]"
                >
                  {it.label}
                </a>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
