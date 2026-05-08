import { Button } from "@/components/ui/button";

type HeroActionsProps = {
  ctaPrimary: string;
  ctaSecondary: string;
  ctaTertiary: string;
  ref?: React.Ref<HTMLDivElement>;
};

export default function HeroActions({
  ctaPrimary,
  ctaSecondary,
  ctaTertiary,
  ref,
}: HeroActionsProps) {
  return (
    <div
      ref={ref}
      className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
      style={{ opacity: 0 }}
    >
      <Button asChild size="lg" className="rounded-md px-6 py-3">
        <a href="#projects">{ctaPrimary}</a>
      </Button>

      <Button asChild variant="outline" size="lg" className="rounded-md px-6 py-3">
        <a href="/api/cv" target="_blank" rel="noopener noreferrer">
          {ctaSecondary}
        </a>
      </Button>

      <Button asChild variant="ghost" size="lg">
        <a href="#contact">{ctaTertiary}</a>
      </Button>
    </div>
  );
}
