import GlassCard from "@/components/ui/GlassCard";
import MotionIn from "@/components/ui/MotionIn";
import { Button } from "@/components/ui/button";
import { Dictionary } from "@/types/i18n";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

type HeroProps = {
  t: Dictionary;
};

export default function Hero({ t }: HeroProps) {
  const hero = t.hero;

  return (
    <section id="hero" className="relative py-16 sm:py-20 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <MotionIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-secondary/30 bg-surface-default px-3 py-1.5 text-sm text-text-secondary shadow-[var(--shadow-glow-secondary-sm)] backdrop-blur-[var(--glass-backdrop)]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary" aria-hidden="true" />
              <span>{hero.eyebrow}</span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-text-primary sm:text-5xl">
              {hero.title.split("Clean Architecture").map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                      Clean Architecture
                    </span>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {hero.subtitle.split("**").map((part, i) =>
                i % 2 === 1 ? (
                  <strong key={i} className="text-text-primary font-semibold">
                    {part}
                  </strong>
                ) : (
                  part
                ),
              )}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="rounded-2xl bg-accent-secondary px-5 py-3 hover:shadow-[var(--shadow-glow-secondary-lg)] hover:scale-[1.02] focus-visible:ring-accent-secondary-glow">
                <a href="#projects">
                  {hero.ctaPrimary}
                </a>
              </Button>

              <Button asChild variant="outline" size="lg" className="rounded-2xl px-5 py-3 hover:shadow-[var(--shadow-glow-primary-sm)]">
                <a
                  href="/api/cv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hero.ctaSecondary}
                </a>
              </Button>

              <Button asChild variant="ghost" size="lg">
                <a href="#contact">
                  {hero.ctaTertiary}
                </a>
              </Button>
            </div>
          </MotionIn>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5">
          <div className="mx-auto w-full max-w-md lg:ml-auto lg:mr-0 lg:max-w-[400px] xl:max-w-[460px]">
            <MotionIn delay={0.04}>
              <GlassCard variant="solid" className="overflow-hidden p-0 shadow-[var(--shadow-glow-primary-md)]">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/profile.png"
                    alt="Andrés Torres - Full-Stack Developer"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-transparent to-transparent opacity-60" />
                </div>
              </GlassCard>
            </MotionIn>

            <MotionIn delay={0.08}>
              <GlassCard variant="solid" className="mt-6 border-border-strong bg-surface-strong p-5 backdrop-blur-[var(--glass-blur-strong)] sm:p-6">
                <h2 className="text-base font-semibold text-text-primary">
                  {hero.highlightsTitle}
                </h2>

                <ul className="mt-4 space-y-3 text-sm text-text-secondary">
                  {(hero.highlights ?? []).map((item: string, idx: number) => (
                    <MotionIn key={idx} delay={0.12 + idx * 0.05}>
                      <li className="flex gap-3">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    </MotionIn>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild variant="outline" size="sm" className="rounded-xl hover:border-accent-primary hover:shadow-[var(--shadow-glow-primary-sm)]">
                    <a href="https://github.com/andrest04" target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4 text-accent-primary" />
                      <span>GitHub</span>
                    </a>
                  </Button>

                  <Button asChild variant="outline" size="sm" className="rounded-xl hover:border-accent-secondary hover:shadow-[var(--shadow-glow-secondary-sm)]">
                    <a href="https://linkedin.com/in/andres-torres-garcia" target="_blank" rel="noreferrer">
                      <Linkedin className="h-4 w-4 text-accent-secondary" />
                      <span>LinkedIn</span>
                    </a>
                  </Button>

                  <Button asChild variant="outline" size="sm" className="rounded-xl hover:border-accent-tertiary">
                    <a href="mailto:andresalbertotorresgarcia@gmail.com">
                      <Mail className="h-4 w-4 text-accent-tertiary" />
                      <span>Email</span>
                    </a>
                  </Button>
                </div>
              </GlassCard>
            </MotionIn>
          </div>
        </div>
      </div>

      <MotionIn delay={0.2}>
        <div className="mt-12 flex justify-center lg:mt-16">
          <a
            href="#projects"
            aria-label="Scroll to projects"
            className="cursor-pointer text-text-tertiary transition duration-200 ease-out hover:text-accent-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </a>
        </div>
      </MotionIn>
    </section>
  );
}
