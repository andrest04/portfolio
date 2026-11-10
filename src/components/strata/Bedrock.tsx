import type { Dictionary } from "@/types/i18n";

/** Education: the band under every job. Its heading is the strip rendered before it. */
export default function Bedrock({ t }: { t: Dictionary["bedrock"] }) {
  return (
    <div className="stratum tone--basalt" data-settle>
      <div className="stratum__inner">
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

          <div className="bedrock__tools">
            <h3 className="bedrock__heading">{t.tools.title}</h3>
            <p>{t.tools.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
