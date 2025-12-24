import GlassCard from "@/components/ui/GlassCard";
import MotionIn from "@/components/ui/MotionIn";
import { Dictionary } from "@/types/i18n";
import Image from "next/image";

type HeroProps = {
  t: Dictionary;
};

export default function Hero({ t }: HeroProps) {
  const hero = t.hero;

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <MotionIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface-default px-3 py-1 text-sm text-text-secondary backdrop-blur-[var(--glass-backdrop)]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary animate-pulse" />
              <span>{hero.eyebrow}</span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
              {hero.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {hero.subtitle.split("**").map((part, i) =>
                i % 2 === 1 ? <strong key={i} className="text-text-primary font-semibold">{part}</strong> : part
              )}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-2xl bg-accent-secondary px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-ring)] transition duration-200 ease-out hover:shadow-[var(--shadow-glow-secondary-lg)] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary-glow focus-visible:ring-offset-0"
              >
                {hero.ctaPrimary}
              </a>

              <a
                href="/api/cv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-border-medium bg-surface-default px-5 py-3 text-sm font-medium text-text-primary backdrop-blur-[var(--glass-backdrop)] transition duration-200 ease-out hover:border-border-strong hover:bg-surface-medium hover:shadow-[var(--shadow-glow-primary-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-glow"
              >
                {hero.ctaSecondary}
              </a>

              <a
                href="#contact"
                className="text-sm font-medium text-text-secondary transition duration-200 ease-out hover:text-accent-secondary"
              >
                {hero.ctaTertiary}
              </a>
            </div>
          </MotionIn>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5">
          <MotionIn delay={0.04}>
            <GlassCard variant="solid" className="overflow-hidden p-0">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/profile.png"
                  alt="Andrés Torres - Full-Stack Developer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
              </div>
            </GlassCard>
          </MotionIn>

          <MotionIn delay={0.08}>
            <GlassCard variant="solid" className="mt-6 p-5 sm:p-6">
              <h2 className="text-base font-semibold text-text-primary">
                {hero.highlightsTitle}
              </h2>

              <ul className="mt-4 space-y-3 text-sm text-text-secondary">
                {(hero.highlights ?? []).map((item: string, idx: number) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <a
                  href="https://github.com/andrest04"
                  className="rounded-xl border border-border-default bg-surface-default px-3 py-2 text-text-primary backdrop-blur-[var(--glass-backdrop)] transition duration-200 ease-out hover:border-border-strong hover:bg-surface-medium"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>

                <a
                  href="https://linkedin.com/in/andres-torres-garcia"
                  className="rounded-xl border border-border-default bg-surface-default px-3 py-2 text-text-primary backdrop-blur-[var(--glass-backdrop)] transition duration-200 ease-out hover:border-border-strong hover:bg-surface-medium"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>

                <a
                  href="mailto:andresalbertotorresgarcia@gmail.com"
                  className="rounded-xl border border-border-default bg-surface-default px-3 py-2 text-text-primary backdrop-blur-[var(--glass-backdrop)] transition duration-200 ease-out hover:border-border-strong hover:bg-surface-medium"
                >
                  Email
                </a>
              </div>
            </GlassCard>
          </MotionIn>
        </div>
      </div>
    </section>
  );
}
