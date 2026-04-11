"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Dictionary } from "@/types/i18n";
import { Github, Linkedin, Mail } from "lucide-react";
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
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
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
            eyebrowRef.current,
            titleRef.current,
            subtitleRef.current,
            ctaRef.current,
            imageRef.current,
            highlightsRef.current,
            scrollIndicatorRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        return;
      }

      const split = SplitText.create(titleRef.current, {
        type: "words,chars",
        mask: "words",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      )
        .fromTo(
          split.chars,
          { y: "100%" },
          { y: "0%", duration: 0.7, stagger: 0.02 },
          "-=0.3"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, y: 30, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          highlightsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
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

      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 rounded-full border border-accent-secondary/30 bg-surface-default px-3 py-1.5 text-sm text-text-secondary shadow-[var(--shadow-glow-secondary-sm)] backdrop-blur-[var(--glass-backdrop)]"
            style={{ opacity: 0 }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent-secondary"
              aria-hidden="true"
            />
            <span>{hero.eyebrow}</span>
          </div>

          <h1
            ref={titleRef}
            className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-text-primary sm:text-5xl"
          >
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
              )
            )}
          </h1>

          <p
            ref={subtitleRef}
            className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
            style={{ opacity: 0 }}
          >
            {hero.subtitle.split("**").map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="text-text-primary font-semibold">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>

          <div
            ref={ctaRef}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ opacity: 0 }}
          >
            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-accent-secondary px-5 py-3 hover:shadow-[var(--shadow-glow-secondary-lg)] hover:scale-[1.02] focus-visible:ring-accent-secondary-glow"
            >
              <a href="#projects">{hero.ctaPrimary}</a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-2xl px-5 py-3 hover:shadow-[var(--shadow-glow-primary-sm)]"
            >
              <a href="/api/cv" target="_blank" rel="noopener noreferrer">
                {hero.ctaSecondary}
              </a>
            </Button>

            <Button asChild variant="ghost" size="lg">
              <a href="#contact">{hero.ctaTertiary}</a>
            </Button>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5">
          <div className="mx-auto w-full max-w-md lg:ml-auto lg:mr-0 lg:max-w-[400px] xl:max-w-[460px]">
            <div ref={imageRef} style={{ opacity: 0 }}>
              <GlassCard
                variant="solid"
                className="overflow-hidden p-0 shadow-[var(--shadow-glow-primary-md)]"
              >
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
            </div>

            <div ref={highlightsRef} style={{ opacity: 0 }}>
              <GlassCard
                variant="solid"
                className="mt-6 border-border-strong bg-surface-strong p-5 backdrop-blur-[var(--glass-blur-strong)] sm:p-6"
              >
                <h2 className="text-base font-semibold text-text-primary">
                  {hero.highlightsTitle}
                </h2>

                <ul className="mt-4 space-y-3 text-sm text-text-secondary">
                  {(hero.highlights ?? []).map(
                    (item: string, idx: number) => (
                      <li key={idx} className="flex gap-3">
                        <span
                          className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent-primary"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-xl hover:border-accent-primary hover:shadow-[var(--shadow-glow-primary-sm)]"
                  >
                    <a
                      href="https://github.com/andrest04"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github className="h-4 w-4 text-accent-primary" />
                      <span>GitHub</span>
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-xl hover:border-accent-secondary hover:shadow-[var(--shadow-glow-secondary-sm)]"
                  >
                    <a
                      href="https://linkedin.com/in/andres-torres-garcia"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin className="h-4 w-4 text-accent-secondary" />
                      <span>LinkedIn</span>
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-xl hover:border-accent-tertiary"
                  >
                    <a href="mailto:andresalbertotorresgarcia@gmail.com">
                      <Mail className="h-4 w-4 text-accent-tertiary" />
                      <span>Email</span>
                    </a>
                  </Button>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className="mt-12 flex justify-center lg:mt-16" style={{ opacity: 0 }}>
        <a
          href="#experience"
          aria-label="Scroll to experience"
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
