import BondInstrument from "@/components/sections/BondInstrument";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/types/i18n";

type HeroProps = {
  t: Dictionary;
  locale: Locale;
};

export default function Hero({ t, locale }: HeroProps) {
  return (
    <section className="hero" data-locale={locale}>
      <div className="hero__copy">
        <h1 className="lines">
          {t.hero.headline.map((line, index) => (
            <span className="line" key={line}>
              <span data-line style={{ "--i": index } as React.CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </h1>
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
      <div className="hero__instrument">
        <BondInstrument t={t.instrument} locale={locale} />
      </div>
    </section>
  );
}
