import TechChip from "@/components/ui/TechChip";

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
        <TechChip key={tech} interactive>
          {tech}
        </TechChip>
      ))}
    </div>
  );
}
