import { Button } from "@/components/ui/button";
import MagneticWrap from "@/components/ui/MagneticWrap";

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
      <MagneticWrap>
        <Button
          asChild
          size="lg"
          className="rounded-2xl bg-accent-secondary px-6 py-3 hover:shadow-[var(--shadow-glow-secondary-lg)] hover:scale-[1.02] focus-visible:ring-accent-secondary-glow"
        >
          <a href="#projects">{ctaPrimary}</a>
        </Button>
      </MagneticWrap>

      <MagneticWrap>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-2xl px-6 py-3 hover:shadow-[var(--shadow-glow-primary-sm)]"
        >
          <a href="/api/cv" target="_blank" rel="noopener noreferrer">
            {ctaSecondary}
          </a>
        </Button>
      </MagneticWrap>

      <MagneticWrap>
        <Button asChild variant="ghost" size="lg">
          <a href="#contact">{ctaTertiary}</a>
        </Button>
      </MagneticWrap>
    </div>
  );
}
