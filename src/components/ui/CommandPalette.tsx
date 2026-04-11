"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
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
} from "lucide-react";
import { Dictionary } from "@/types/i18n";

interface CommandPaletteProps {
  lang: "es" | "en";
  t: Dictionary;
}

export default function CommandPalette({ lang, t }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = (href: string) => {
    setOpen(false);

    // Wait for dialog close animation to finish before acting
    setTimeout(() => {
      if (href.startsWith("#")) {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else if (href.startsWith("http")) {
        window.open(href, "_blank");
      } else {
        router.push(href);
      }
    }, 150);
  };

  const otherLang = lang === "es" ? "en" : "es";
  const placeholder = lang === "es" ? "Buscar..." : "Search...";
  const navLabel = lang === "es" ? "Navegación" : "Navigation";
  const actionsLabel = lang === "es" ? "Acciones" : "Actions";
  const linksLabel = lang === "es" ? "Enlaces" : "Links";
  const noResults = lang === "es" ? "Sin resultados." : "No results.";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex items-center gap-2 rounded-xl border border-border-default bg-surface-default px-3 py-1.5 text-xs text-text-tertiary backdrop-blur-[var(--glass-backdrop)] transition-colors hover:border-border-strong hover:text-text-secondary"
        aria-label="Open command palette"
      >
        <span>⌘K</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>{noResults}</CommandEmpty>

          <CommandGroup heading={navLabel}>
            <CommandItem onSelect={() => navigate("#hero")}>
              <Home className="mr-2 h-4 w-4" />
              {t.nav.hero}
            </CommandItem>
            <CommandItem onSelect={() => navigate("#projects")}>
              <FolderKanban className="mr-2 h-4 w-4" />
              {t.nav.projects}
            </CommandItem>
            <CommandItem onSelect={() => navigate("#experience")}>
              <Briefcase className="mr-2 h-4 w-4" />
              {t.nav.experience}
            </CommandItem>
            <CommandItem onSelect={() => navigate("#about-skills")}>
              <User className="mr-2 h-4 w-4" />
              {t.nav.aboutSkills}
            </CommandItem>
            <CommandItem onSelect={() => navigate("#contact")}>
              <Mail className="mr-2 h-4 w-4" />
              {t.nav.contact}
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading={actionsLabel}>
            <CommandItem onSelect={() => navigate("/api/cv")}>
              <Download className="mr-2 h-4 w-4" />
              {t.hero.ctaSecondary}
            </CommandItem>
            <CommandItem onSelect={() => navigate(`/${otherLang}`)}>
              <Globe className="mr-2 h-4 w-4" />
              {lang === "es" ? "Switch to English" : "Cambiar a Español"}
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading={linksLabel}>
            <CommandItem onSelect={() => navigate("https://github.com/andrest04")}>
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </CommandItem>
            <CommandItem onSelect={() => navigate("https://linkedin.com/in/andres-torres-garcia")}>
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
