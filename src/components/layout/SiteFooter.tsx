import ExternalLink from "@/components/layout/ExternalLink";
import { CONTACT } from "@/lib/contact";
import type { Dictionary } from "@/types/i18n";

export default function SiteFooter({ t }: { t: Dictionary }) {
  return (
    <footer className="site-footer">
      <p>{t.footer.description}</p>
      <ul>
        <li>
          <a href="/api/cv" className="plain-link">
            {t.hero.ctaSecondary}
          </a>
        </li>
        <li>
          <ExternalLink href={CONTACT.github} notice={t.meta.newTab} className="plain-link">
            {t.contact.githubLabel}
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={CONTACT.linkedin} notice={t.meta.newTab} className="plain-link">
            {t.contact.linkedinLabel}
          </ExternalLink>
        </li>
        <li>
          <a href={`mailto:${CONTACT.email}`} className="plain-link">
            {t.contact.emailLabel}
          </a>
        </li>
      </ul>
      <p className="site-footer__year">© {new Date().getFullYear()}</p>
    </footer>
  );
}
