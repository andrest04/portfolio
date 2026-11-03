import Image from "next/image";
import { CONTACT } from "@/lib/contact";
import type { Dictionary } from "@/types/i18n";

export default function Contact({ t }: { t: Dictionary }) {
  const c = t.contact;

  return (
    <section id="contact" className="contact">
      <div className="contact__sentence">
        <h2 data-reveal>{c.title}</h2>
        <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          {c.statement}
        </p>
      </div>

      <figure className="contact__portrait" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
        <Image src="/profile.png" alt={t.about.portraitAlt} width={170} height={170} />
      </figure>

      <dl className="contact__links" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
        <div>
          <dt>{c.emailLabel}</dt>
          <dd>
            <a href={`mailto:${CONTACT.email}`} className="link">
              {CONTACT.email}
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
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="link">
              linkedin.com/in/andres-torres-garcia
            </a>
          </dd>
        </div>
        <div>
          <dt>{c.githubLabel}</dt>
          <dd>
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className="link">
              github.com/andrest04
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
