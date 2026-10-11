import ScrollReveal from "@/components/ui/ScrollReveal";
import { Dictionary } from "@/types/i18n";
import ProjectsHoverList from "@/components/sections/projects/ProjectsHoverList";

type ProjectsProps = {
  t: Dictionary;
};

export default function Projects({ t }: ProjectsProps) {
  const projects = t.projects;

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24">
      <div className="flex flex-col gap-4">
        <ScrollReveal>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl">
            {projects.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {projects.subtitle}
          </p>
        </ScrollReveal>

        <div className="mt-10">
          <ProjectsHoverList
            projects={projects.items ?? []}
            featuredLabel={projects.featured}
            viewGithubLabel={projects.viewGithub}
            viewDemoLabel={projects.viewDemo}
          />
        </div>
      </div>
    </section>
  );
}
