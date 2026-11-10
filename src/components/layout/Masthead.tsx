import LangSwitch from "@/components/layout/LangSwitch";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/types/i18n";

type MastheadProps = {
  t: Dictionary;
  locale: Locale;
  /** In-page targets, in the order the links appear. */
  targets: { experience: string; education: string; contact: string };
};

/**
 * The page's own navigation, on the surface band from tablet width up. The name is not
 * repeated here: the headline right under it opens with it, and the rail carries it.
 */
export default function Masthead({ t, locale, targets }: MastheadProps) {
  const links = [
    { href: `#${targets.experience}`, label: t.nav.experience },
    { href: `#${targets.education}`, label: t.nav.education },
    { href: `#${targets.contact}`, label: t.nav.contact },
  ];

  return (
    <header className="masthead">
      <nav aria-label={t.nav.label}>
        <ul className="masthead__links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="link link--plain">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <LangSwitch locale={locale} label={t.meta.otherLanguage} accessibleLabel={t.meta.switchLanguage} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
