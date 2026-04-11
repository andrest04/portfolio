"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Dictionary } from "@/types/i18n";

type ProjectsProps = {
  t: Dictionary;
};

export default function Projects({ t }: ProjectsProps) {
  const projects = t.projects;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(
    () => {
      if (!isDesktop || !trackRef.current || !sectionRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const totalScroll = trackRef.current.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [isDesktop] }
  );

  return (
    <section ref={sectionRef} id="projects" className="py-16 sm:py-20 lg:py-0">
      <div className={isDesktop ? "h-screen flex flex-col justify-center overflow-hidden" : ""}>
        <div className={isDesktop ? "px-4 sm:px-6 lg:px-8" : ""}>
          <ScrollReveal>
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              {projects.title}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {projects.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {isDesktop ? (
          <div
            ref={trackRef}
            className="mt-8 flex gap-6 px-4 sm:px-6 lg:px-8"
          >
            {(projects.items ?? []).map((p, idx: number) => (
              <div key={p.name ?? idx} className="w-[420px] flex-none">
                <TiltCard>
                  <GlassCard className="gradient-border h-full p-5 sm:p-6">
                    <ProjectCardContent p={p} projects={projects} />
                  </GlassCard>
                </TiltCard>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {(projects.items ?? []).map((p, idx: number) => (
              <ScrollReveal key={p.name ?? idx} delay={0.08 * idx} y={40}>
                <TiltCard>
                  <GlassCard className="gradient-border h-full p-5 sm:p-6">
                    <ProjectCardContent p={p} projects={projects} />
                  </GlassCard>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCardContent({
  p,
  projects,
}: {
  p: Dictionary["projects"]["items"][number];
  projects: Dictionary["projects"];
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{p.name}</h3>
          <p className="mt-1 text-sm text-text-secondary">{p.role}</p>
        </div>
        <span className="rounded-full border border-border-default bg-surface-default px-3 py-1 text-xs text-text-secondary backdrop-blur-[var(--glass-backdrop)]">
          Featured
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        {p.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {(p.stack ?? []).slice(0, 6).map((tag: string) => (
          <span
            key={tag}
            className="rounded-xl border border-border-default bg-surface-default px-3 py-1 text-xs text-text-secondary backdrop-blur-[var(--glass-backdrop)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <ul className="mt-5 space-y-2 text-sm text-text-secondary">
        {(p.highlights ?? []).slice(0, 4).map((h: string, i: number) => (
          <li key={i} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent-secondary"
            />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        {p.links?.github ? (
          <Button
            variant="outline"
            size="default"
            asChild
            className="rounded-xl text-xs cursor-pointer"
          >
            <a href={p.links.github} target="_blank" rel="noreferrer">
              {projects.viewGithub}
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </Button>
        ) : null}

        {p.links?.demo ? (
          <Button
            size="default"
            asChild
            className="rounded-xl bg-accent-secondary text-xs hover:shadow-[var(--shadow-glow-secondary-lg)] hover:scale-[1.02] cursor-pointer"
          >
            <a href={p.links.demo} target="_blank" rel="noreferrer">
              {projects.viewDemo}
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </Button>
        ) : null}
      </div>
    </>
  );
}
