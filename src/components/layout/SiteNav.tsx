import LangSwitch from "@/components/layout/LangSwitch";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/types/i18n";

type SiteNavProps = {
  t: Dictionary;
  locale: Locale;
};

export default function SiteNav({ t, locale }: SiteNavProps) {
  const links = [
    { href: "#work", label: t.nav.work },
    { href: "#experience", label: t.nav.experience },
    { href: "#skills", label: t.nav.skills },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="site-nav">
      <a href="#main" className="site-nav__mark plain-link">
        {t.hero.name}
      </a>
      <nav aria-label={t.nav.label}>
        <ul className="site-nav__links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="plain-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <LangSwitch
        locale={locale}
        label={t.meta.otherLanguage}
        accessibleLabel={t.meta.switchLanguage}
      />
    </header>
  );
}
