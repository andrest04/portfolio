"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/ThemeProvider";

const subscribeNoop = () => () => {};

// false on the server and during hydration, true afterwards (no effect + setState).
function useIsClient() {
  return React.useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

export default function NavbarThemeToggle({
  ariaLabel,
}: {
  ariaLabel: string;
}) {
  const { theme, toggleTheme } = useTheme();
  const mounted = useIsClient();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="rounded-2xl"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      suppressHydrationWarning
    >
      {mounted ? (
        theme === "dark" ? <Sun size={18} /> : <Moon size={18} />
      ) : (
        <span aria-hidden className="block size-[18px]" />
      )}
    </Button>
  );
}

