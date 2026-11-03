import Image from "next/image";
import type { Dictionary } from "@/types/i18n";

const LOGOS: Record<string, string> = {
  EDTeam: "/edteam-logo.svg",
};

export default function Experience({ t }: { t: Dictionary["experience"] }) {
  const { education } = t;

  return (
    <div id="experience" className="record__part">
      <h2 data-reveal>{t.title}</h2>

      <ul className="rows">
        {t.items.map((item, index) => {
          const logo = LOGOS[item.company];
          return (
            <li key={item.company} data-reveal style={{ "--i": index + 1 } as React.CSSProperties}>
              <div className="rows__ends">
                <span className="rows__name">
                  {logo ? (
                    <Image src={logo} alt="" width={16} height={16} className="rows__mark" />
                  ) : (
                    <span className="rows__dot" aria-hidden="true" />
                  )}
                  <h3>{item.company}</h3>
                </span>
                <span className="rows__value">{item.period}</span>
              </div>
              <div className="rows__body">
                <p>{item.role}</p>
                <p>{item.description}</p>
                <p className="rows__soft">{item.stack.join(", ")}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="rows__group">
        <h3 className="rows__soft" data-reveal>
          {education.title}
        </h3>
        <ul className="rows">
          <li data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <div className="rows__ends">
              <span className="rows__name">
                <span className="rows__dot" aria-hidden="true" />
                <span>{education.school}</span>
              </span>
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
