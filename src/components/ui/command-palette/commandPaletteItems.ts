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
import { createElement, type ReactNode } from "react";
import { Dictionary } from "@/types/i18n";

export type PaletteItem = {
  icon: ReactNode;
  label: string;
  href: string;
  group: string;
};

export function getCommandPaletteItems(
  t: Dictionary,
  lang: "es" | "en"
): PaletteItem[] {
  const isEs = lang === "es";
  const otherLang = isEs ? "en" : "es";
  const navGroup = isEs ? "Navegación" : "Navigation";
  const actionsGroup = isEs ? "Acciones" : "Actions";
  const linksGroup = isEs ? "Enlaces" : "Links";
  const iconClass = "h-4 w-4";

  return [
    { icon: createElement(Home, { className: iconClass }), label: t.nav.hero, href: "#hero", group: navGroup },
    { icon: createElement(FolderKanban, { className: iconClass }), label: t.nav.projects, href: "#projects", group: navGroup },
    { icon: createElement(Briefcase, { className: iconClass }), label: t.nav.experience, href: "#experience", group: navGroup },
    { icon: createElement(User, { className: iconClass }), label: t.nav.aboutSkills, href: "#about-skills", group: navGroup },
    { icon: createElement(Mail, { className: iconClass }), label: t.nav.contact, href: "#contact", group: navGroup },
    { icon: createElement(Download, { className: iconClass }), label: t.hero.ctaSecondary, href: "/api/cv", group: actionsGroup },
    { icon: createElement(Globe, { className: iconClass }), label: isEs ? "Switch to English" : "Cambiar a Español", href: `/${otherLang}`, group: actionsGroup },
    { icon: createElement(Github, { className: iconClass }), label: "GitHub", href: "https://github.com/andrest04", group: linksGroup },
    { icon: createElement(Linkedin, { className: iconClass }), label: "LinkedIn", href: "https://linkedin.com/in/andres-torres-garcia", group: linksGroup },
  ];
}
