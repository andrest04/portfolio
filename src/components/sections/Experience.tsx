import GlassCard from "@/components/ui/GlassCard";
import MotionIn from "@/components/ui/MotionIn";
import { Dictionary } from "@/types/i18n";
import { Briefcase } from "lucide-react";

type ExperienceProps = { t: Dictionary };

export default function Experience({ t }: ExperienceProps) {
  const exp = t.experience;

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24">
      <MotionIn>
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl">
          {exp.title}
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {exp.subtitle}
        </p>
      </MotionIn>

      <MotionIn delay={0.06}>
        <div className="mt-6 h-px w-24 bg-border-medium relative overflow-hidden">
          <div className="h-px w-10 bg-gradient-to-r from-accent-primary to-accent-secondary" />
        </div>
      </MotionIn>

      <div className="mt-10 space-y-6">
        {(exp.items ?? []).map((item, idx) => (
          <MotionIn key={item.company + idx} delay={0.08 * idx}>
            <GlassCard hover={false} className="p-5 sm:p-6">
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
          </MotionIn>
        ))}
      </div>
    </section>
  );
}
