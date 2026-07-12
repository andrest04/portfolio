"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { setUserLocale } from "@/lib/locale-actions";
import type { Locale } from "@/lib/i18n";

export default function NavbarLangSwitch() {
  const locale = useLocale() as Locale;
  const otherLang: Locale = locale === "es" ? "en" : "es";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await setUserLocale(otherLang);
      router.refresh();
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-2xl"
      disabled={isPending}
      onClick={handleClick}
    >
      {locale.toUpperCase()} → {otherLang.toUpperCase()}
    </Button>
  );
}
