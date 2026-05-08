"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function NavbarThemeToggle({
  ariaLabel,
}: {
  ariaLabel: string;
}) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

