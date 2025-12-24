import GlassCard from "@/components/ui/GlassCard";
import MotionIn from "@/components/ui/MotionIn";
import { Dictionary } from "@/types/i18n";

type SkillsProps = { t: Dictionary };

export default function Skills({ t }: SkillsProps) {
  const skills = t.skills;

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24">
      <MotionIn>
        <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          {skills.title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {skills.subtitle}
        </p>
      </MotionIn>

      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {(skills.groups ?? []).map((g, idx: number) => (
              <MotionIn key={g.title ?? idx} delay={0.04 * idx}>
                <GlassCard className="h-full p-5 sm:p-6">
                  <h3 className="text-base font-semibold text-text-primary">
                    {g.title}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(g.items ?? []).map((item: string) => (
                      <span
                        key={item}
                        className="rounded-xl border border-border-default bg-surface-default px-3 py-1 text-xs text-text-secondary backdrop-blur-[var(--glass-backdrop)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </MotionIn>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <MotionIn delay={0.12}>
            <GlassCard variant="solid" className="p-5 sm:p-6">
              <h3 className="text-base font-semibold text-text-primary">
                {skills.strengthsTitle}
              </h3>

              <ul className="mt-4 space-y-3 text-sm text-text-secondary">
                {(skills.strengths ?? []).map((s: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent-primary" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </MotionIn>
        </div>
      </div>
    </section>
  );
}
