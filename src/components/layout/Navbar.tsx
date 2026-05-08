"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import { Menu, X } from "lucide-react";
import { Dictionary } from "@/types/i18n";
import CommandPalette from "@/components/ui/CommandPalette";
import NavbarBrand from "@/components/layout/navbar/NavbarBrand";
import NavbarLinks, {
  type NavItem,
} from "@/components/layout/navbar/NavbarLinks";
import NavbarLangSwitch from "@/components/layout/navbar/NavbarLangSwitch";
import NavbarMobileDrawer from "@/components/layout/navbar/NavbarMobileDrawer";
import { useActiveSection } from "@/components/layout/navbar/useActiveSection";

type NavbarProps = {
  lang: "es" | "en";
  t: Dictionary;
};

const SECTION_IDS = ["hero", "projects", "experience", "about-skills", "contact"];

export default function Navbar({ lang, t }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  const items: NavItem[] = [
    { href: "#hero", label: t.nav.hero, id: "hero" },
    { href: "#projects", label: t.nav.projects, id: "projects" },
    { href: "#experience", label: t.nav.experience, id: "experience" },
    { href: "#about-skills", label: t.nav.aboutSkills, id: "about-skills" },
    { href: "#contact", label: t.nav.contact, id: "contact" },
  ];

  return (
    <div className="sticky top-4 z-50 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <Card
        variant="solid"
        className="flex items-center justify-between px-4 py-3 sm:px-5"
      >
        <NavbarBrand lang={lang} />

        <NavbarLinks items={items} activeSection={activeSection} />

        <div className="flex items-center gap-2">
          <CommandPalette lang={lang} t={t} />
          <NavbarLangSwitch lang={lang} />

          <Button
            variant="outline"
            size="icon"
            className="md:hidden rounded-2xl"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </Card>

      <NavbarMobileDrawer
        items={items}
        activeSection={activeSection}
        open={open}
        onItemSelect={() => setOpen(false)}
      />
    </div>
  );
}
