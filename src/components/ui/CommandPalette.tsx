"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FolderKanban,
  Briefcase,
  User,
  Mail,
  Download,
  Globe,
  Github,
  Linkedin,
  Search,
  X,
} from "lucide-react";
import { Dictionary } from "@/types/i18n";

interface CommandPaletteProps {
  lang: "es" | "en";
  t: Dictionary;
}

interface PaletteItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  group: string;
}

export default function CommandPalette({ lang, t }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const otherLang = lang === "es" ? "en" : "es";
  const isEs = lang === "es";

  const items: PaletteItem[] = [
    { icon: <Home className="h-4 w-4" />, label: t.nav.hero, href: "#hero", group: isEs ? "Navegación" : "Navigation" },
    { icon: <FolderKanban className="h-4 w-4" />, label: t.nav.projects, href: "#projects", group: isEs ? "Navegación" : "Navigation" },
    { icon: <Briefcase className="h-4 w-4" />, label: t.nav.experience, href: "#experience", group: isEs ? "Navegación" : "Navigation" },
    { icon: <User className="h-4 w-4" />, label: t.nav.aboutSkills, href: "#about-skills", group: isEs ? "Navegación" : "Navigation" },
    { icon: <Mail className="h-4 w-4" />, label: t.nav.contact, href: "#contact", group: isEs ? "Navegación" : "Navigation" },
    { icon: <Download className="h-4 w-4" />, label: t.hero.ctaSecondary, href: "/api/cv", group: isEs ? "Acciones" : "Actions" },
    { icon: <Globe className="h-4 w-4" />, label: isEs ? "Switch to English" : "Cambiar a Español", href: `/${otherLang}`, group: isEs ? "Acciones" : "Actions" },
    { icon: <Github className="h-4 w-4" />, label: "GitHub", href: "https://github.com/andrest04", group: isEs ? "Enlaces" : "Links" },
    { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", href: "https://linkedin.com/in/andres-torres-garcia", group: isEs ? "Enlaces" : "Links" },
  ];

  const filtered = query
    ? items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  const groups = [...new Set(filtered.map((i) => i.group))];

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");

      setTimeout(() => {
        if (href.startsWith("#")) {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        } else if (href.startsWith("http")) {
          window.open(href, "_blank");
        } else {
          router.push(href);
        }
      }, 200);
    },
    [router]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex items-center gap-2 rounded-xl border border-border-default bg-surface-default px-3 py-1.5 text-xs text-text-tertiary backdrop-blur-[var(--glass-backdrop)] transition-colors hover:border-border-strong hover:text-text-secondary"
        aria-label="Open command palette"
      >
        <span>⌘K</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={() => { setOpen(false); setQuery(""); }}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label={isEs ? "Paleta de comandos" : "Command palette"}
            className="fixed inset-x-0 top-[20%] z-[9991] mx-auto w-full max-w-lg px-4 animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <div className="overflow-hidden rounded-2xl border border-border-medium bg-[rgb(var(--bg-2))] shadow-lg backdrop-blur-[var(--glass-blur-strong)]">
              <div className="flex items-center gap-3 border-b border-border-default px-4 py-3">
                <Search className="h-4 w-4 text-text-tertiary" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={isEs ? "Buscar..." : "Search..."}
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
                  autoFocus
                />
                <button
                  onClick={() => { setOpen(false); setQuery(""); }}
                  className="rounded-lg p-1 text-text-tertiary hover:text-text-secondary transition-colors"
                  aria-label={isEs ? "Cerrar" : "Close"}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[300px] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <p className="py-6 text-center text-sm text-text-tertiary">
                    {isEs ? "Sin resultados." : "No results."}
                  </p>
                )}

                {groups.map((group) => (
                  <div key={group}>
                    <p className="px-2 py-1.5 text-xs font-medium text-text-tertiary">
                      {group}
                    </p>
                    {filtered
                      .filter((i) => i.group === group)
                      .map((item) => (
                        <button
                          key={item.href}
                          onClick={() => handleSelect(item.href)}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-medium hover:text-text-primary"
                        >
                          <span className="text-text-tertiary">{item.icon}</span>
                          {item.label}
                        </button>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
