import { Badge } from "@/components/ui/badge";

type HeroStackProps = {
  items: string[];
  ref?: React.Ref<HTMLDivElement>;
};

export default function HeroStack({ items, ref }: HeroStackProps) {
  return (
    <div
      ref={ref}
      className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-2"
      style={{ opacity: 0 }}
    >
      {items.map((tech) => (
        <Badge
          key={tech}
          variant="outline"
          className="rounded-lg border-border-default bg-surface-default px-3 py-1 text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
        >
          {tech}
        </Badge>
      ))}
    </div>
  );
}
