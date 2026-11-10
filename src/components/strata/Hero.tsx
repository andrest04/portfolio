import { ArrowDownIcon } from "@/components/strata/Icons";
import StratumEdge from "@/components/strata/StratumEdge";
import { samplesOf, stratumTitle, type NumberedSample } from "@/components/strata/samples";
import type { Dictionary, Stratum } from "@/types/i18n";

type HeroProps = {
  t: Dictionary;
  /** The entry the primary action scrolls to. */
  recordId: string;
  /** The strata whose top edges show under the surface, with the tone each one wears. */
  below: Array<{ stratum: Stratum; tone: string }>;
  numbered: Map<string, NumberedSample>;
};

export default function Hero({ t, recordId, below, numbered }: HeroProps) {
  return (
    <div className="hero">
      <div className="hero__sheet">
        <div>
          <h1 className="hero__headline">{t.hero.headline}</h1>
          <p className="hero__datum label">{t.hero.datum}</p>
        </div>
        <div className="hero__meta">
          <p className="hero__status">{t.hero.status}</p>
          <p className="hero__actions">
            <a className="button" href={`#${recordId}`}>
              {t.hero.ctaPrimary}
            </a>
            <a className="link" href="/api/cv">
              {t.hero.ctaSecondary}
              <ArrowDownIcon />
            </a>
          </p>
        </div>
      </div>

      <ul className="peeks" aria-label={t.hero.below}>
        {below.map(({ stratum, tone }, index) => (
          <li key={stratum.id} className={`peek tone--${tone}`}>
            <StratumEdge variant={index} />
            <a href={`#${stratum.id}`}>
              <span className="peek__row">
                <span className="peek__title">{stratumTitle(stratum.company, stratum.role)}</span>
                <span className="stratum__when">{stratum.period}</span>
              </span>
              <span className="peek__tags tags">
                {samplesOf(stratum.projects, numbered).map(({ project, number }) => (
                  <span key={project.id} className="tag">
                    {t.record.sample} {number} · {project.name}
                  </span>
                ))}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
