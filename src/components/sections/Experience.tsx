"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { Dictionary } from "@/types/i18n";
import ExperienceItem from "@/components/sections/experience/ExperienceItem";

type ExperienceProps = { t: Dictionary };

export default function Experience({ t }: ExperienceProps) {
  const exp = t.experience;

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
        <div className="mt-6 h-px w-24 bg-border-medium" />
      </ScrollReveal>

      <div className="relative mt-10">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border-default sm:left-6" />

        <div className="space-y-8">
          {(exp.items ?? []).map((item, idx) => (
            <ScrollReveal key={item.company + idx} delay={0.1 * idx} y={30}>
              <ExperienceItem item={item} currentLabel={exp.current} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
