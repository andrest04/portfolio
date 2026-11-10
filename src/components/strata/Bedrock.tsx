import StratumEdge from "@/components/strata/StratumEdge";
import { stratumTitle } from "@/components/strata/samples";
import type { Dictionary } from "@/types/i18n";

export default function Bedrock({ t, edge }: { t: Dictionary["bedrock"]; edge: number }) {
  const titleId = `${t.id}-title`;

  return (
    <section id={t.id} className="stratum tone--basalt" aria-labelledby={titleId}>
      <div className="stratum__body">
        <StratumEdge variant={edge} />
        <div className="stratum__inner">
          <header className="stratum__head">
            <h2 id={titleId} className="stratum__title">
              {stratumTitle(t.school, t.degree)}
            </h2>
            <p className="stratum__when">{t.period}</p>
          </header>

          <div className="bedrock__body">
            <ul className="points bedrock__details">
              {t.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>

            <div className="bedrock__certifications">
              <h3 className="bedrock__heading">{t.certifications.title}</h3>
              <ul className="bedrock__list">
                {t.certifications.items.map((item) => (
                  <li key={item.name}>
                    <strong>{item.name}</strong>
                    <span>
                      {item.issuer}, {item.date}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bedrock__languages">
              <h3 className="bedrock__heading">{t.languages.title}</h3>
              <ul className="bedrock__list">
                {t.languages.items.map((item) => (
                  <li key={item.name}>
                    <strong>{item.name}</strong>
                    <span>{item.level}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bedrock__skills">
              <h3 className="bedrock__heading">{t.skills.title}</h3>
              <dl className="skills">
                {t.skills.groups.map((group) => (
                  <div key={group.title}>
                    <dt className="label">{group.title}</dt>
                    <dd>{group.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
