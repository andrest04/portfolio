import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/types/i18n";

type HeroProps = {
  t: Dictionary;
  locale: Locale;
};

/* The first picture is the large one. Chosen by image so reordering the projects cannot change the composition. */
const HERO_PICTURES = ["/work/kataleya.webp", "/work/booking.webp", "/work/eduspace.webp"];

export default function Hero({ t, locale }: HeroProps) {
  const projects = HERO_PICTURES.flatMap((src) =>
    t.projects.items.filter((project) => project.image.main === src),
  );

  return (
    <section className="hero" data-locale={locale}>
      <h1 className="lines">
        {t.hero.headline.map((line, index) => (
          <span className="line" key={line}>
            <span data-line style={{ "--i": index } as React.CSSProperties}>
              {line}
            </span>
          </span>
        ))}
      </h1>
      <div className="hero__copy">
        <p className="hero__sentence" data-follow>
          {t.hero.sentence}
        </p>
        <div className="hero__actions" data-follow>
          <a href="#work" className="button">
            {t.hero.ctaPrimary}
          </a>
          <a href="/api/cv" className="link">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>
      <div className="hero__work" data-follow>
        {projects.map((project, index) => (
          <a
            key={project.name}
            className="hero__picture"
            href={project.links.demo}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={project.image.main}
              alt={project.image.mainAlt}
              fill
              preload={index === 0}
              sizes={
                index === 0
                  ? "(min-width: 1100px) 50vw, 100vw"
                  : "(min-width: 1100px) 25vw, 50vw"
              }
            />
          </a>
        ))}
      </div>
    </section>
  );
}
