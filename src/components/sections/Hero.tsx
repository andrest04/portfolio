"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import MagneticWrap from "@/components/ui/MagneticWrap";
import { Dictionary } from "@/types/i18n";
import Image from "next/image";

const GradientMesh = dynamic(() => import("@/components/ui/GradientMesh"), {
  ssr: false,
});

type HeroProps = {
  t: Dictionary;
};

export default function Hero({ t }: HeroProps) {
  const hero = t.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleBeforeRef = useRef<HTMLSpanElement>(null);
  const titleGradientRef = useRef<HTMLSpanElement>(null);
  const titleAfterRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !titleRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            headerRef.current,
            titleRef.current,
            subtitleRef.current,
            ctaRef.current,
            stackRef.current,
            positionRef.current,
            scrollIndicatorRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        return;
      }

      const splitBefore = titleBeforeRef.current
        ? SplitText.create(titleBeforeRef.current, { type: "words,chars", mask: "words" })
        : null;
      const splitAfter = titleAfterRef.current
        ? SplitText.create(titleAfterRef.current, { type: "words,chars", mask: "words" })
        : null;

      gsap.set(titleRef.current, { opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );

      if (splitBefore?.chars?.length) {
        tl.fromTo(
          splitBefore.chars,
          { y: "100%" },
          { y: "0%", duration: 0.7, stagger: 0.02 },
          "-=0.3"
        );
      }

      tl.fromTo(
        titleGradientRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power2.inOut" },
        "-=0.2"
      );

      if (splitAfter?.chars?.length) {
        tl.fromTo(
          splitAfter.chars,
          { y: "100%" },
          { y: "0%", duration: 0.7, stagger: 0.02 },
          "-=0.4"
        );
      }

      tl
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        )
        .fromTo(
          stackRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        )
        .fromTo(
          positionRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.1"
        );

      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="hero" className="relative py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -inset-y-16 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden">
        <GradientMesh className="h-full w-full opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgb(var(--bg))]" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <div ref={headerRef} className="flex flex-col items-center gap-4" style={{ opacity: 0 }}>
          <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-2 border-border-medium shadow-[var(--shadow-glow-primary-md)]">
            <Image
              src="/profile.png"
              alt="Andrés Torres"
              fill
              className="object-cover object-top"
              priority
              sizes="128px"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary sm:text-xl">
              {hero.name}
            </h2>
            <p className="text-sm text-accent-secondary">{hero.role}</p>
          </div>
        </div>

        <h1
          ref={titleRef}
          className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          style={{ opacity: 0 }}
        >
          {(() => {
            const parts = hero.title.split("Clean Architecture");
            return (
              <>
                {parts[0] && <span ref={titleBeforeRef}>{parts[0]}</span>}
                <span
                  ref={titleGradientRef}
                  className="inline-block bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                >
                  Clean Architecture
                </span>
                {parts[1] && <span ref={titleAfterRef}>{parts[1]}</span>}
              </>
            );
          })()}
        </h1>

        <p
          ref={subtitleRef}
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
          style={{ opacity: 0 }}
        >
          {hero.subtitle}
        </p>

        <div
          ref={ctaRef}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ opacity: 0 }}
        >
          <MagneticWrap>
            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-accent-secondary px-6 py-3 hover:shadow-[var(--shadow-glow-secondary-lg)] hover:scale-[1.02] focus-visible:ring-accent-secondary-glow"
            >
              <a href="#projects">{hero.ctaPrimary}</a>
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
                {hero.ctaSecondary}
              </a>
            </Button>
          </MagneticWrap>

          <MagneticWrap>
            <Button asChild variant="ghost" size="lg">
              <a href="#contact">{hero.ctaTertiary}</a>
            </Button>
          </MagneticWrap>
        </div>

        <div
          ref={stackRef}
          className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-2"
          style={{ opacity: 0 }}
        >
          {hero.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-border-default bg-surface-default px-3 py-1 text-xs font-medium text-text-secondary backdrop-blur-[var(--glass-backdrop)] transition-colors hover:border-border-strong hover:text-text-primary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div
          ref={positionRef}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-primary/20 bg-surface-default px-4 py-2 text-sm text-text-secondary backdrop-blur-[var(--glass-backdrop)]"
          style={{ opacity: 0 }}
        >
          <Image
            src="/edteam-logo.svg"
            alt="EDTeam"
            width={18}
            height={18}
          />
          <span>
            {hero.currentPosition} @{" "}
            <span className="font-medium text-text-primary">{hero.currentCompany}</span>
          </span>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className="mt-10 flex justify-center" style={{ opacity: 0 }}>
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
    </section>
  );
}
