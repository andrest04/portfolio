import Entry from "@/components/strata/Entry";
import { ArrowDownIcon } from "@/components/strata/Icons";
import { projectAnchor, projectsInPageOrder, stratumTitle } from "@/components/strata/samples";
import type { Dictionary, Stratum } from "@/types/i18n";

type SurfaceProps = {
  stratum: Stratum;
  tone: string;
  /** The anchor of the entry under the opening screen. */
  recordId: string;
  t: Dictionary;
};

export default function Surface({ stratum, tone, recordId, t }: SurfaceProps) {
  const titleId = `${stratum.id}-title`;
  const indexId = `${stratum.id}-projects`;

  return (
    <section id={stratum.id} className={`stratum tone--${tone}`} aria-labelledby={titleId} tabIndex={-1}>
      <div className="hero">
        <div className="hero__lead">
          <h1 className="hero__headline">{t.hero.headline}</h1>
          <p className="hero__when label">{stratum.period}</p>
          <p className="hero__status">{t.hero.status}</p>
          <p className="hero__actions">
            <a className="button" href={`#${recordId}`}>
              {t.hero.ctaPrimary}
            </a>
            <a className="link" href="/api/cv" download>
              {t.hero.ctaSecondary}
              <ArrowDownIcon />
            </a>
          </p>
        </div>

        <nav className="index" aria-labelledby={indexId}>
          <p id={indexId} className="index__title label">
            {t.hero.projects}
          </p>
          <ul>
            {projectsInPageOrder(t).map((project) => (
              <li key={project.id}>
                <a href={`#${projectAnchor(project.id)}`} className="index__row">
                  <span className="index__name">{project.name}</span>{" "}
                  <span className="index__role">{project.role}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="stratum__inner entry" id={recordId} tabIndex={-1} data-settle>
        <header className="stratum__head">
          <h2 id={titleId} className="stratum__title">
            {stratumTitle(stratum.company, stratum.role)}
          </h2>
          <p className="stratum__when">
            {stratum.period}, {stratum.location}
          </p>
        </header>
        <Entry stratum={stratum} t={t} />
      </div>
    </section>
  );
}
