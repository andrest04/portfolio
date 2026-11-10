"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setUserLocale } from "@/lib/locale-actions";
import type { Locale } from "@/lib/i18n";

type LangSwitchProps = {
  locale: Locale;
  label: string;
  accessibleLabel: string;
};

export default function LangSwitch({ locale, label, accessibleLabel }: LangSwitchProps) {
  const target: Locale = locale === "es" ? "en" : "es";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await setUserLocale(target);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      className="lang-switch link link--plain"
      lang={target}
      aria-label={accessibleLabel}
      disabled={isPending}
      aria-busy={isPending}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
