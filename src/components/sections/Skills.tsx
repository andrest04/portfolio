import type { Dictionary } from "@/types/i18n";

export default function Skills({ t }: { t: Dictionary["skills"] }) {
  return (
    <>
      <div id="skills" className="record__part">
        <h2 data-reveal>{t.title}</h2>
        <p className="record__intro" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          {t.intro}
        </p>

        <ul className="rows">
          {t.groups.map((group, index) => (
            <li key={group.title} data-reveal style={{ "--i": index + 2 } as React.CSSProperties}>
              <div className="rows__pair">
                <h3 className="rows__name">{group.title}</h3>
                <p>{group.items.join(", ")}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="record__notes">
        {t.notes.map((note) => (
          <div className="rows__group" key={note.title}>
            <h3 className="rows__soft" data-reveal>
              {note.title}
            </h3>
            <ul className="rows">
              {note.items.map((item, index) => (
                <li key={item} data-reveal style={{ "--i": index + 1 } as React.CSSProperties}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
