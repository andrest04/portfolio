import { CONTACT } from "@/lib/contact";
import type { Dictionary } from "@/types/i18n";

export default function SiteFooter({ t }: { t: Dictionary }) {
  return (
    <footer className="site-footer">
      <p>{t.footer.description}</p>
      <ul>
        <li>
          <a href={CONTACT.github} target="_blank" rel="noreferrer" className="plain-link">
            {t.contact.githubLabel}
          </a>
        </li>
        <li>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="plain-link">
            {t.contact.linkedinLabel}
          </a>
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
