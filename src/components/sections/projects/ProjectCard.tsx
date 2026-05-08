import Card from "@/components/ui/Card";
import TechChip from "@/components/ui/TechChip";
import { Button } from "@/components/ui/button";

export type ProjectItem = {
  name: string;
  role: string;
  description: string;
  stack: string[];
  highlights: string[];
  links: {
    demo: string;
    github: string;
  };
};

type ProjectCardProps = {
  project: ProjectItem;
  featuredLabel: string;
  viewGithubLabel: string;
  viewDemoLabel: string;
};

export default function ProjectCard({
  project,
  featuredLabel,
  viewGithubLabel,
  viewDemoLabel,
}: ProjectCardProps) {
  return (
    <Card className="h-full p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">{project.role}</p>
        </div>

        <span className="rounded-full border border-border-default bg-surface-default px-3 py-1 text-xs text-text-secondary">
          {featuredLabel}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {(project.stack ?? []).slice(0, 6).map((tag) => (
          <TechChip key={tag}>{tag}</TechChip>
        ))}
      </div>

      <ul className="mt-5 space-y-2 text-sm text-text-secondary">
        {(project.highlights ?? []).slice(0, 4).map((h, i) => (
          <li key={i} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-text-tertiary"
            />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.links?.github ? (
          <Button
            variant="outline"
            size="default"
            asChild
            className="rounded-md text-xs cursor-pointer"
          >
            <a href={project.links.github} target="_blank" rel="noreferrer">
              {viewGithubLabel}
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </Button>
        ) : null}

        {project.links?.demo ? (
          <Button
            size="default"
            asChild
            className="rounded-md text-xs cursor-pointer"
          >
            <a href={project.links.demo} target="_blank" rel="noreferrer">
              {viewDemoLabel}
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
