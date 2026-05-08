"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useNavIndicator } from "@/components/layout/navbar/useNavIndicator";

export type NavItem = { href: string; label: string; id: string };

type NavbarLinksProps = {
  items: NavItem[];
  activeSection: string;
};

export default function NavbarLinks({ items, activeSection }: NavbarLinksProps) {
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useNavIndicator(navRef, indicatorRef, activeSection);

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="relative hidden md:flex items-center gap-6 text-sm"
    >
      <div
        ref={indicatorRef}
        className="absolute bottom-0 h-0.5 rounded-full bg-accent-secondary"
        style={{ width: 0 }}
        aria-hidden="true"
      />
      {items.map((it) => (
        <a
          key={it.href}
          href={it.href}
          data-section={it.id}
          className={cn(
            "pb-1 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-glow rounded-lg",
            activeSection === it.id
              ? "text-text-primary"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          {it.label}
        </a>
      ))}
    </nav>
  );
}
