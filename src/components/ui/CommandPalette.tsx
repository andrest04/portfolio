"use client";

import { Dictionary } from "@/types/i18n";
import { getCommandPaletteItems } from "@/components/ui/command-palette/commandPaletteItems";
import { useCommandPalette } from "@/components/ui/command-palette/useCommandPalette";
import CommandPaletteDialog from "@/components/ui/command-palette/CommandPaletteDialog";

type CommandPaletteProps = {
  lang: "es" | "en";
  t: Dictionary;
};

export default function CommandPalette({ lang, t }: CommandPaletteProps) {
  const { open, query, setQuery, setOpen, close, select } = useCommandPalette();
  const items = getCommandPaletteItems(t, lang);
  const isEs = lang === "es";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex items-center gap-2 rounded-xl border border-border-default bg-surface-default px-3 py-1.5 text-xs text-text-tertiary transition-colors hover:border-border-strong hover:text-text-secondary"
        aria-label={t.nav.openCommandPalette}
      >
        <span>⌘K</span>
      </button>

      {open && (
        <CommandPaletteDialog
          isEs={isEs}
          query={query}
          onQueryChange={setQuery}
          onClose={close}
          onSelect={select}
          items={items}
        />
      )}
    </>
  );
}
