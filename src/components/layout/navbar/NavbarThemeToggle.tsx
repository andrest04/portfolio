"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function NavbarThemeToggle({
  ariaLabel,
}: {
  ariaLabel: string;
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="rounded-2xl"
      onClick={toggleTheme}
      aria-label={ariaLabel}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}

