import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverImg, type HoverImgItem } from "@/components/block/hover-img";

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

type ProjectsHoverListProps = {
  projects: ProjectItem[];
  featuredLabel: string;
  viewGithubLabel: string;
  viewDemoLabel: string;
};

function ProjectBody({
  project,
  featuredLabel,
  viewGithubLabel,
  viewDemoLabel,
}: Omit<ProjectsHoverListProps, "projects"> & { project: ProjectItem }) {
  return (
    <div className="flex max-w-3xl flex-col gap-5">
      <div>
        <Badge
          variant="outline"
          className="border-border-default bg-surface-default px-3 py-1 text-text-secondary"
        >
          {featuredLabel}
        </Badge>
      </div>

      <p className="text-sm leading-relaxed text-text-secondary">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {(project.stack ?? []).slice(0, 6).map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="rounded-lg border-border-default bg-surface-default px-3 py-1 text-text-secondary"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <ul className="space-y-2 text-sm text-text-secondary">
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

      <div className="flex flex-wrap gap-3">
        {project.links?.github ? (
          <Button
            variant="outline"
            size="default"
            asChild
            className="cursor-pointer rounded-md text-xs"
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
            className="cursor-pointer rounded-md text-xs"
          >
            <a href={project.links.demo} target="_blank" rel="noreferrer">
              {viewDemoLabel}
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default function ProjectsHoverList({
  projects,
  featuredLabel,
  viewGithubLabel,
  viewDemoLabel,
}: ProjectsHoverListProps) {
  const items: HoverImgItem[] = projects.map((project) => ({
    title: project.name,
    label: project.role,
    content: (
      <ProjectBody
        project={project}
        featuredLabel={featuredLabel}
        viewGithubLabel={viewGithubLabel}
        viewDemoLabel={viewDemoLabel}
      />
    ),
  }));

  return <HoverImg projects={items} isContained className="hover-img-site" />;
}
