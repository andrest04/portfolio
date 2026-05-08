import ScrollReveal from "@/components/ui/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Dictionary } from "@/types/i18n";

type AboutSkillsProps = { t: Dictionary };

export default function AboutSkills({ t }: AboutSkillsProps) {
  const data = t.aboutSkills;

  const infoPanels = [data.education, data.focus, data.teamwork];

  return (
    <section id="about-skills" className="py-16 sm:py-20 lg:py-24">
      <ScrollReveal>
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl">
          {data.title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {data.subtitle}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mt-6 h-px w-24 bg-border-medium" />
      </ScrollReveal>

      {/* Bento Grid */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Info panels — Education, Focus, Teamwork */}
        {infoPanels.map((panel, idx) => (
          <ScrollReveal key={panel.title} delay={0.08 * idx} y={30}>
            <Card className="h-full rounded-lg border-border-default bg-surface-default py-5 shadow-none sm:py-6">
              <CardContent className="px-5 sm:px-6">
                <h3 className="text-base font-semibold text-text-primary">
                  {panel.title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary">
                  {panel.items.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent-secondary"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}

        {/* Skills groups */}
        {data.skills.map((group, idx) => (
          <ScrollReveal key={group.title} delay={0.06 * idx} y={30}>
            <Card className="h-full rounded-lg border-border-default bg-surface-default py-5 shadow-none sm:py-6">
              <CardContent className="px-5 sm:px-6">
                <h3 className="text-base font-semibold text-text-primary">
                  {group.title}
                </h3>
                <ul role="list" className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-border-default bg-surface-default px-3 py-1.5 text-xs text-text-secondary sm:text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}

        {/* Principle */}
        <ScrollReveal delay={0.2} className="sm:col-span-2 lg:col-span-3">
          <Card className="rounded-lg border-accent-primary/20 bg-surface-medium py-5 shadow-none sm:py-6">
            <CardContent className="px-5 sm:px-6">
              <p className="text-sm leading-relaxed text-text-secondary">
                <span className="font-medium text-accent-primary">
                  {data.principle.label}
                </span>{" "}
                {data.principle.text}
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Strengths */}
        <ScrollReveal delay={0.15} className="sm:col-span-2 lg:col-span-3">
          <Card className="rounded-lg border-border-medium bg-surface-medium py-5 shadow-none sm:py-6">
            <CardContent className="px-5 sm:px-6">
              <h3 className="text-base font-semibold text-text-primary">
                {data.strengthsTitle}
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary">
                {data.strengths.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent-primary"
                    />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
