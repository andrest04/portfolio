"use client";

import { useRef } from "react";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { Dictionary } from "@/types/i18n";
import HeroHeader from "@/components/sections/hero/HeroHeader";
import HeroActions from "@/components/sections/hero/HeroActions";
import HeroStack from "@/components/sections/hero/HeroStack";
import HeroCurrentPosition from "@/components/sections/hero/HeroCurrentPosition";
import { useHeroAnimation } from "@/components/sections/hero/useHeroAnimation";

type HeroProps = {
  t: Dictionary;
};

export default function Hero({ t }: HeroProps) {
  const hero = t.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    section: sectionRef,
    header: headerRef,
    title: titleRef,
    subtitle: subtitleRef,
    cta: ctaRef,
    stack: stackRef,
    position: positionRef,
    scrollIndicator: scrollIndicatorRef,
  });

  return (
    <section ref={sectionRef} id="hero" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <HeroHeader ref={headerRef} name={hero.name} role={hero.role} />

        <h1
          ref={titleRef}
          className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          style={{ opacity: 0 }}
        >
          {hero.title}
        </h1>

        <p
          ref={subtitleRef}
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
          style={{ opacity: 0 }}
        >
          {hero.subtitle}
        </p>

        <HeroActions
          ref={ctaRef}
          ctaPrimary={hero.ctaPrimary}
          ctaSecondary={hero.ctaSecondary}
          ctaTertiary={hero.ctaTertiary}
        />

        <HeroStack ref={stackRef} items={hero.stack} />

        <HeroCurrentPosition
          ref={positionRef}
          position={hero.currentPosition}
          company={hero.currentCompany}
        />
      </div>

      <ScrollIndicator
        ref={scrollIndicatorRef}
        href="#projects"
        ariaLabel="Scroll to projects"
        className="mt-10 flex justify-center"
      />
    </section>
  );
}
