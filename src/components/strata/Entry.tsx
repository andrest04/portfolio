import Sample from "@/components/strata/Sample";
import { projectAnchor, projectsOf } from "@/components/strata/samples";
import type { Dictionary, Stratum } from "@/types/i18n";

/** What was done in a period, then the projects that began in it. Both parts may be short. */
export default function Entry({ stratum, t }: { stratum: Stratum; t: Dictionary }) {
  const projects = projectsOf(stratum.projects, t);

  return (
    <>
      <div className="entry__lede">
        {projects.length > 0 && (
          <ul className="tags">
            {projects.map((project) => (
              <li key={project.id}>
                <a className="tag" href={`#${projectAnchor(project.id)}`}>
                  {t.record.project} · {project.name}
                </a>
              </li>
            ))}
          </ul>
        )}
        <ul className="points">
          {stratum.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      {projects.length > 0 && (
        <div className="samples">
          {projects.map((project) => (
            <Sample key={project.id} project={project} t={t} />
          ))}
        </div>
      )}
    </>
  );
}
