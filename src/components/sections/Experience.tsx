"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import { Dictionary } from "@/types/i18n";
import { Briefcase } from "lucide-react";

type ExperienceProps = { t: Dictionary };

export default function Experience({ t }: ExperienceProps) {
  const exp = t.experience;
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(lineRef.current, { scaleY: 1 });
      return;
    }

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      }
    );
  });

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24">
      <ScrollReveal>
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl">
          {exp.title}
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {exp.subtitle}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mt-6 h-px w-24 bg-border-medium relative overflow-hidden">
          <div className="h-px w-10 bg-gradient-to-r from-accent-primary to-accent-secondary" />
        </div>
      </ScrollReveal>

      <div className="relative mt-10">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border-default sm:left-6">
          <div
            ref={lineRef}
            className="h-full w-full origin-top bg-gradient-to-b from-accent-primary to-accent-secondary"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        <div className="space-y-8">
          {(exp.items ?? []).map((item, idx) => (
            <ScrollReveal key={item.company + idx} delay={0.1 * idx} y={30}>
              <div className="relative flex gap-6 pl-12 sm:pl-14">
                {/* Timeline node */}
                <div className="absolute left-3 top-5 grid h-5 w-5 place-items-center sm:left-4">
                  <div className="h-3 w-3 rounded-full border-2 border-accent-primary bg-[rgb(var(--bg))] shadow-[0_0_8px_var(--accent-primary)]" />
                </div>

                <GlassCard hover={false} className="flex-1 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-accent-primary/10 text-accent-primary">
                      <Briefcase size={20} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="text-base font-semibold text-text-primary">
                          {item.company}
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-accent-primary/10 px-2.5 py-0.5 text-xs font-medium text-accent-primary">
                          {exp.current}
                        </span>
                      </div>

                      <p className="mt-0.5 text-sm font-medium text-accent-secondary">
                        {item.role}
                      </p>
                      <p className="mt-0.5 text-xs text-text-tertiary">
                        {item.period}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                        {item.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg bg-surface-medium px-2.5 py-1 text-xs font-medium text-text-secondary border border-border-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
