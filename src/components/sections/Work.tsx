import Image from "next/image";
import type { Dictionary } from "@/types/i18n";

const PREVIEW_SIZES = "(min-width: 1200px) 40vw, 100vw";
const DETAIL_SIZES = "(min-width: 1200px) 560px, 100vw";

export default function Work({ t }: { t: Dictionary }) {
  const { title, subtitle, viewDemo, viewGithub, items } = t.projects;

  return (
    <section id="work" className="work">
      <div className="work__column">
        <h2 data-reveal>{title}</h2>
        <p className="work__intro" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          {subtitle}
        </p>

        <ul className="ledger">
          {items.map((project, index) => (
            <li
              className="ledger__row"
              key={project.name}
              data-reveal
              style={{ "--i": index + 2 } as React.CSSProperties}
            >
              {/* Outside <details> so hover can show it while the row is closed. */}
              <figure className="ledger__preview">
                <div className="ledger__frame">
                  <Image
                    src={project.image.main}
                    alt={project.image.mainAlt}
                    width={1600}
                    height={1200}
                    sizes={PREVIEW_SIZES}
                  />
                </div>
              </figure>

              <details name="work" open={index === 0}>
                <summary>
                  <h3 className="ledger__name">{project.name}</h3>
                  <span className="ledger__role">{project.role}</span>
                  <span className="ledger__lead">{project.stack[0]}</span>
                  <svg className="ledger__toggle" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </summary>

                <div className="ledger__panel">
                  <p>{project.description}</p>
                  {project.image.detail && (
                    <Image
                      className="ledger__detail"
                      src={project.image.detail}
                      alt={project.image.detailAlt ?? ""}
                      width={1200}
                      height={750}
                      sizes={DETAIL_SIZES}
                    />
                  )}
                  <p>{project.highlights.join(", ")}</p>
                  <p className="ledger__stack">{project.stack.join(", ")}</p>
                  <p className="ledger__links">
                    <a href={project.links.demo} target="_blank" rel="noreferrer" className="link">
                      {viewDemo}
                    </a>
                    <a href={project.links.github} target="_blank" rel="noreferrer" className="link">
                      {viewGithub}
                    </a>
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
