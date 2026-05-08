import { cn } from "@/lib/utils";

type TechChipProps = {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
};

export default function TechChip({
  children,
  interactive = false,
  className,
}: TechChipProps) {
  return (
    <span
      className={cn(
        "rounded-lg border border-border-default bg-surface-default px-3 py-1 text-xs font-medium text-text-secondary",
        interactive &&
          "transition-colors hover:border-border-strong hover:text-text-primary",
        className
      )}
    >
      {children}
    </span>
  );
}
