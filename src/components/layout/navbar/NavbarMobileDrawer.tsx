import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/components/layout/navbar/NavbarLinks";

type NavbarMobileDrawerProps = {
  items: NavItem[];
  activeSection: string;
  open: boolean;
  onItemSelect: () => void;
};

export default function NavbarMobileDrawer({
  items,
  activeSection,
  open,
  onItemSelect,
}: NavbarMobileDrawerProps) {
  return (
    <nav
      id="mobile-nav"
      aria-label="Mobile navigation"
      aria-hidden={!open}
      className={cn(
        "mt-3 md:hidden transition-all duration-200 ease-out overflow-hidden",
        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <Card className="rounded-lg border-border-default bg-surface-default p-3 shadow-none">
        <div className="flex flex-col">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              onClick={onItemSelect}
              className={cn(
                "rounded-xl py-3 px-4 text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                activeSection === it.id
                  ? "bg-surface-default text-text-primary"
                  : "text-text-secondary hover:bg-surface-default hover:text-text-primary"
              )}
            >
              {it.label}
            </a>
          ))}
        </div>
      </Card>
    </nav>
  );
}
