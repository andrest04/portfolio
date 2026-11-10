import type { Dictionary, Project } from "@/types/i18n";

/** The projects that began in a period, in the order the period lists them. */
export function projectsOf(ids: string[], t: Dictionary): Project[] {
  return ids.flatMap((id) => t.projects.find((project) => project.id === id) ?? []);
}

/** Every project in page order: period by period, from the surface down. */
export function projectsInPageOrder(t: Dictionary): Project[] {
  return projectsOf(
    t.strata.flatMap((stratum) => stratum.projects),
    t,
  );
}

export function projectAnchor(id: string): string {
  return `project-${id}`;
}

export function stratumTitle(company: string, role: string | null): string {
  return role ? `${company} · ${role}` : company;
}
