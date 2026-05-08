"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type NavbarLangSwitchProps = {
  lang: "es" | "en";
};

export default function NavbarLangSwitch({ lang }: NavbarLangSwitchProps) {
  const pathname = usePathname();
  const otherLang = lang === "es" ? "en" : "es";

  const switchHref = pathname
    ? pathname
        .split("/")
        .map((p, i) => (i === 1 ? otherLang : p))
        .join("/")
    : `/${otherLang}`;

  return (
    <Button variant="outline" size="sm" asChild className="rounded-2xl">
      <Link href={switchHref}>
        {lang.toUpperCase()} → {otherLang.toUpperCase()}
      </Link>
    </Button>
  );
}
