"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import GlassCard from "@/components/ui/GlassCard";
import { Dictionary } from "@/types/i18n";

type StatsProps = { t: Dictionary };

export default function Stats({ t }: StatsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const stats = t.stats;

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const counters = sectionRef.current.querySelectorAll("[data-counter]");

      counters.forEach((el) => {
        const target = parseInt(el.getAttribute("data-counter") ?? "0", 10);

        if (prefersReducedMotion) {
          el.textContent = `${target}+`;
          return;
        }

        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.value)}+`;
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-10 sm:py-12">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.items.map((stat) => (
          <GlassCard
            key={stat.label}
            hover={false}
            variant="solid"
            className="p-5 text-center sm:p-6"
          >
            <p
              data-counter={stat.value}
              className="text-2xl font-semibold text-accent-primary sm:text-3xl"
            >
              0+
            </p>
            <p className="mt-1 text-xs text-text-secondary sm:text-sm">
              {stat.label}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
