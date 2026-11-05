import Image from "next/image";
import ExternalLink from "@/components/layout/ExternalLink";
import { CONTACT } from "@/lib/contact";
import type { Dictionary } from "@/types/i18n";

export default function Contact({ t }: { t: Dictionary }) {
  const c = t.contact;
  const [user, domain] = CONTACT.email.split("@");

  return (
    <section id="contact" className="contact">
      <div className="contact__sentence">
        <h2 data-reveal>{c.title}</h2>
        <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          {c.statement}
        </p>
      </div>

      <figure className="contact__portrait" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
        <Image
          src="/portrait.png"
          alt={t.about.portraitAlt}
          width={170}
          height={170}
          sizes="(min-width: 900px) 15vw, 96px"
        />
      </figure>

      <dl className="contact__links" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
        <div>
          <dt>{c.emailLabel}</dt>
          <dd>
            <a href={`mailto:${CONTACT.email}`} className="link">
              {user}
              <wbr />@{domain}
            </a>
          </dd>
        </div>
        <div>
          <dt>{c.phoneLabel}</dt>
          <dd>
            <a href={`tel:${CONTACT.phoneHref}`} className="link">
              {CONTACT.phoneDisplay}
            </a>
          </dd>
        </div>
        <div>
          <dt>{c.linkedinLabel}</dt>
          <dd>
            <ExternalLink href={CONTACT.linkedin} notice={t.meta.newTab} className="link">
              linkedin.com/in/andres-torres-garcia
            </ExternalLink>
          </dd>
        </div>
        <div>
          <dt>{c.githubLabel}</dt>
          <dd>
            <ExternalLink href={CONTACT.github} notice={t.meta.newTab} className="link">
              github.com/andrest04
            </ExternalLink>
          </dd>
        </div>
        <div>
          <dt>{c.cvLabel}</dt>
          <dd>
            <a href="/api/cv" className="link">
              {t.hero.ctaSecondary}
            </a>
          </dd>
        </div>
        <div>
          <dt>{c.locationLabel}</dt>
          <dd>{c.locationValue}</dd>
        </div>
      </dl>
    </section>
  );
}
