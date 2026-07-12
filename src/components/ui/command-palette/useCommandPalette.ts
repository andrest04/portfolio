"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useScrollLock } from "@/hooks/useScrollLock";
import { setUserLocale } from "@/lib/locale-actions";
import type { Locale } from "@/lib/i18n";

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useScrollLock(open);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const select = useCallback(
    (href: string) => {
      close();
      setTimeout(async () => {
        if (href.startsWith("locale:")) {
          const nextLocale = href.slice("locale:".length) as Locale;
          await setUserLocale(nextLocale);
          router.refresh();
        } else if (href.startsWith("#")) {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        } else if (href.startsWith("http")) {
          window.open(href, "_blank");
        } else {
          router.push(href);
        }
      }, 200);
    },
    [close, router]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return {
    open,
    query,
    setQuery,
    setOpen,
    close,
    select,
  };
}
