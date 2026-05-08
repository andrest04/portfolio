"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import MorphingBlob from "@/components/ui/MorphingBlob";
import MagneticButton from "@/components/ui/MagneticButton";
import { Dictionary } from "@/types/i18n";
import { useHeroAnimation } from "@/components/sections/hero/useHeroAnimation";

type HeroProps = {
  t: Dictionary;
};

export default function Hero({ t }: HeroProps) {
  const hero = t.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    section: sectionRef,
    eyebrow: eyebrowRef,
    title: titleRef,
    subtitle: subtitleRef,
    cta: ctaRef,
    portrait: portraitRef,
    scrollIndicator: scrollIndicatorRef,
  });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <MorphingBlob className="left-[60%] top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div
            ref={eyebrowRef}
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-text-tertiary"
            style={{ opacity: 0 }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {hero.name} — {hero.role}
          </div>

          <h1
            ref={titleRef}
            className="mt-8 text-4xl font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl motion-safe:animate-[hero-breathe_9s_ease-in-out_infinite]"
            style={{ opacity: 0 }}
          >
            {hero.title}
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
            style={{ opacity: 0 }}
          >
            {hero.subtitle}
          </p>

          <div
            ref={ctaRef}
            className="mt-10 flex flex-wrap items-center gap-3"
            style={{ opacity: 0 }}
          >
            <MagneticButton>
              <Button asChild size="lg" className="rounded-full px-7">
                <a href="#projects">{hero.ctaPrimary}</a>
              </Button>
            </MagneticButton>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-text-primary bg-transparent px-7 text-text-primary hover:bg-text-primary hover:text-background"
            >
              <a href="#contact">{hero.ctaTertiary}</a>
            </Button>
          </div>
        </div>

        <div
          ref={portraitRef}
          className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none"
        >
          <div className="relative aspect-square w-full motion-safe:animate-[blob-drift_32s_ease-in-out_infinite]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-[18%] rounded-full bg-[radial-gradient(closest-side,rgb(var(--surface)/0.55),rgb(var(--surface)/0.18)_40%,rgb(var(--surface)/0.06)_65%,transparent_80%)] blur-3xl motion-safe:animate-[hero-glow-pulse_8s_ease-in-out_infinite]"
            />
            <div
              className="relative h-full w-full overflow-hidden border border-border-medium bg-surface-subtle transition-[border-radius] duration-[7000ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%" }}
            >
              <Image
                src="/profile.png"
                alt={hero.name}
                fill
                className="object-cover object-top"
                priority
                sizes="(min-width: 1024px) 40vw, 80vw"
              />
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator
        ref={scrollIndicatorRef}
        href="#projects"
        ariaLabel="Scroll to projects"
        className="mt-16 flex justify-center"
      />
    </section>
  );
}
