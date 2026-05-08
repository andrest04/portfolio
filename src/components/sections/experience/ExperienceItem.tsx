import { Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type ExperienceItemData = {
  company: string;
  role: string;
  period: string;
  description: string;
  stack: string[];
};

type ExperienceItemProps = {
  item: ExperienceItemData;
  currentLabel: string;
};

export default function ExperienceItem({ item, currentLabel }: ExperienceItemProps) {
  const isCurrent = /present|presente/i.test(item.period);

  return (
    <div className="relative flex gap-6 pl-12 sm:pl-14">
      <div className="absolute left-3 top-5 grid h-5 w-5 place-items-center sm:left-4">
        <div className="h-3 w-3 rounded-full border border-white/40 bg-[rgb(var(--bg))]" />
      </div>

      <Card className="flex-1 rounded-lg border-border-default bg-surface-default py-5 shadow-none sm:py-6">
        <CardContent className="flex items-start gap-4 px-5 sm:px-6">
          <div className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-accent-primary/10 text-accent-primary">
            <Briefcase size={20} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-base font-semibold text-text-primary">
                {item.company}
              </h3>
              {isCurrent && (
                <Badge className="bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/15">
                  {currentLabel}
                </Badge>
              )}
            </div>

            <p className="mt-0.5 text-sm font-medium text-accent-secondary">
              {item.role}
            </p>
            <p className="mt-0.5 text-xs text-text-tertiary">{item.period}</p>

            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {item.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="rounded-lg border-border-default bg-surface-default px-3 py-1 text-text-secondary"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
