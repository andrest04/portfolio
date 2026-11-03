import type { Dictionary } from "@/types/i18n";

export default function Experience({ t }: { t: Dictionary["experience"] }) {
  const { education } = t;

  return (
    <div id="experience" className="record__part">
      <h2 data-reveal>{t.title}</h2>

      <ul className="rows">
        {t.items.map((item, index) => (
          <li key={item.company} data-reveal style={{ "--i": index + 1 } as React.CSSProperties}>
            <div className="rows__ends">
              <h3 className="rows__name">{item.company}</h3>
              <span className="rows__value">{item.period}</span>
            </div>
            <div className="rows__body">
              <p>{item.role}</p>
              <p>{item.description}</p>
              <p className="rows__soft">{item.stack.join(", ")}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="rows__group">
        <h3 className="rows__soft" data-reveal>
          {education.title}
        </h3>
        <ul className="rows">
          <li data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <div className="rows__ends">
              <span className="rows__name">{education.school}</span>
              <span className="rows__value">{education.term}</span>
            </div>
            <div className="rows__body">
              <p>{education.degree}</p>
              <p>{education.standing}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
