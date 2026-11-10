import Sample from "@/components/strata/Sample";
import StratumEdge from "@/components/strata/StratumEdge";
import { samplesOf, stratumTitle, type NumberedSample } from "@/components/strata/samples";
import type { Dictionary, Stratum as StratumContent } from "@/types/i18n";

type StratumProps = {
  stratum: StratumContent;
  tone: string;
  /** Which authored boundary opens the entry. */
  edge: number;
  numbered: Map<string, NumberedSample>;
  t: Dictionary;
  /** Rendered above the entry, inside the same band. */
  lead?: React.ReactNode;
  /** An extra anchor on the entry itself, for a band that has a lead above it. */
  entryId?: string;
};

export default function Stratum({ stratum, tone, edge, numbered, t, lead, entryId }: StratumProps) {
  const titleId = `${stratum.id}-title`;
  const samples = samplesOf(stratum.projects, numbered);

  return (
    <section id={stratum.id} className={`stratum tone--${tone}`} aria-labelledby={titleId}>
      {lead}
      <div className="stratum__body" id={entryId} data-settle>
        <StratumEdge variant={edge} />
        <div className="stratum__inner">
          <header className="stratum__head">
            <h2 id={titleId} className="stratum__title">
              {stratumTitle(stratum.company, stratum.role)}
            </h2>
            <p className="stratum__when">
              {stratum.period}, {stratum.location}
            </p>
            {samples.length > 0 && (
              <ul className="tags">
                {samples.map(({ project, number }) => (
                  <li key={project.id}>
                    <a className="tag" href={`#sample-${project.id}`}>
                      {t.record.sample} {number} · {project.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </header>

          <ul className="points">
            {stratum.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          {/* A period may have no sample: the entry then stands on its own points. */}
          {samples.length > 0 && (
            <div className="samples">
              {samples.map((sample) => (
                <Sample key={sample.project.id} sample={sample} t={t} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
