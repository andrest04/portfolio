import ScrollReveal from "@/components/ui/ScrollReveal";
import { Dictionary } from "@/types/i18n";
import ProjectCard from "@/components/sections/projects/ProjectCard";

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

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {(projects.items ?? []).map((p, idx) => (
            <ScrollReveal
              key={p.name ?? idx}
              delay={0.08 * idx}
              y={40}
              className="h-full"
            >
              <ProjectCard
                project={p}
                featuredLabel={projects.featured}
                viewGithubLabel={projects.viewGithub}
                viewDemoLabel={projects.viewDemo}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
