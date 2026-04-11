import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import { Dictionary } from "@/types/i18n";

type AboutProps = { t: Dictionary };

export default function About({ t }: AboutProps) {
  const about = t.about;

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl">
              {about.title}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {about.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-6 h-px w-24 bg-border-medium relative overflow-hidden">
              <div className="h-px w-10 bg-gradient-to-r from-accent-primary to-accent-secondary" />
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-6 sm:grid-cols-2">
            {(about.cards ?? []).map((c, idx: number) => (
              <ScrollReveal key={c.title ?? idx} delay={0.08 * idx} y={40}>
                <GlassCard hover={false} className="h-full p-5 sm:p-6">
                  <h3 className="text-base font-semibold text-text-primary">
                    {c.title}
                  </h3>

                  <ul className="mt-4 space-y-3 leading-relaxed text-sm text-text-secondary">
                    {(c.items ?? []).map((item: string, i: number) => (
                      <li key={i} className="flex gap-3">
                        <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent-secondary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.2}>
              <GlassCard hover={false} variant="solid" className="sm:col-span-2 p-5 sm:p-6 border-accent-primary/20">
                <p className="text-sm leading-relaxed text-text-secondary">
                  <span className="font-medium text-accent-primary">
                    {about.principleLabel}
                  </span>{" "}
                  {about.principleText}
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
