import Image from "next/image";
import type { Dictionary } from "@/types/i18n";

export default function About({ t }: { t: Dictionary }) {
  return (
    <section id="about" className="about">
      <div className="about__letter">
        <Image
          data-reveal
          className="about__portrait"
          src="/profile.png"
          alt={t.about.portraitAlt}
          width={44}
          height={44}
        />
        <h2 data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          {t.about.title}
        </h2>
        {t.about.paragraphs.map((paragraph, index) => (
          <p key={paragraph} data-reveal style={{ "--i": index + 2 } as React.CSSProperties}>
            {paragraph}
          </p>
        ))}
        <p className="about__sign" data-reveal style={{ "--i": 6 } as React.CSSProperties}>
          <em>{t.hero.name}</em>
          <span>{t.hero.role}</span>
        </p>
      </div>
    </section>
  );
}
