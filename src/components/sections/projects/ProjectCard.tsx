import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card className="h-full gap-4 rounded-lg border-border-default bg-surface-default py-5 shadow-none transition-colors hover:border-border-strong sm:py-6">
      <CardHeader className="px-5 sm:px-6">
        <CardTitle className="text-lg font-semibold text-text-primary">
          {project.name}
        </CardTitle>
        <CardDescription className="text-sm text-text-secondary">
          {project.role}
        </CardDescription>
        <CardAction>
          <Badge
            variant="outline"
            className="border-border-default bg-surface-default px-3 py-1 text-text-secondary"
          >
            {featuredLabel}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="px-5 sm:px-6">
        <p className="text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
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
      </CardContent>

      <CardFooter className="flex flex-wrap gap-3 px-5 sm:px-6">
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
      </CardFooter>
    </Card>
  );
}
