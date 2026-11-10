import type { Dictionary, Project } from "@/types/i18n";

export type NumberedSample = {
  project: Project;
  /** Two digits, counted in page order across every stratum. */
  number: string;
};

/** Numbers the projects in the order the strata place them, so labels match the page. */
export function numberSamples(t: Dictionary): Map<string, NumberedSample> {
  const byId = new Map(t.projects.map((project) => [project.id, project]));
  const numbered = new Map<string, NumberedSample>();

  for (const id of t.strata.flatMap((stratum) => stratum.projects)) {
    const project = byId.get(id);
    if (!project) continue;
    numbered.set(id, { project, number: String(numbered.size + 1).padStart(2, "0") });
  }

  return numbered;
}

export function samplesOf(ids: string[], numbered: Map<string, NumberedSample>): NumberedSample[] {
  return ids.flatMap((id) => numbered.get(id) ?? []);
}

export function stratumTitle(company: string, role: string | null): string {
  return role ? `${company} · ${role}` : company;
}
