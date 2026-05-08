"use client";

import { Search, X } from "lucide-react";
import type { PaletteItem } from "@/components/ui/command-palette/commandPaletteItems";

type CommandPaletteDialogProps = {
  isEs: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
  onSelect: (href: string) => void;
  items: PaletteItem[];
};

export default function CommandPaletteDialog({
  isEs,
  query,
  onQueryChange,
  onClose,
  onSelect,
  items,
}: CommandPaletteDialogProps) {
  const filtered = query
    ? items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  const groups = [...new Set(filtered.map((i) => i.group))];

  return (
    <>
      <div
        className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={isEs ? "Paleta de comandos" : "Command palette"}
        className="fixed inset-x-0 top-[20%] z-[9991] mx-auto w-full max-w-lg px-4 animate-in fade-in slide-in-from-top-4 duration-200"
      >
        <div className="overflow-hidden rounded-2xl border border-border-medium bg-[rgb(var(--bg-2))] shadow-lg ">
          <div className="flex items-center gap-3 border-b border-border-default px-4 py-3">
            <Search className="h-4 w-4 text-text-tertiary" />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={isEs ? "Buscar..." : "Search..."}
              className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
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
                      onClick={() => onSelect(item.href)}
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
  );
}
