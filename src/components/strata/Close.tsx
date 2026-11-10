import ExternalLink from "@/components/layout/ExternalLink";
import { ArrowDownIcon, ArrowOutIcon } from "@/components/strata/Icons";
import StratumEdge from "@/components/strata/StratumEdge";
import { CONTACT } from "@/lib/contact";
import type { Dictionary } from "@/types/i18n";

/** Shows a profile address the way people say it, without the scheme. */
function withoutScheme(url: string): string {
  return url.replace(/^https?:\/\//, "");
}

export default function Close({ t, edge }: { t: Dictionary; edge: number }) {
  const c = t.contact;
  const titleId = `${c.id}-title`;
  const [user, domain] = CONTACT.email.split("@");

  return (
    <section id={c.id} className="stratum tone--ochre" aria-labelledby={titleId}>
      <StratumEdge variant={edge} />
      <div className="close__inner">
        <h2 id={titleId} className="close__statement">
          {c.statement}
        </h2>
        <p className="close__lead">{c.lead}</p>
        <a href={`mailto:${CONTACT.email}`} className="button close__email">
          <span className="sr-only">{c.emailLabel}: </span>
          <span>
            {user}
            <wbr />@{domain}
          </span>
        </a>

        <dl className="close__links">
          <div>
            <dt className="label">{c.cvLabel}</dt>
            <dd>
              <a href="/api/cv" className="link">
                {t.hero.ctaSecondary}
                <ArrowDownIcon />
              </a>
            </dd>
          </div>
          <div>
            <dt className="label">{c.phoneLabel}</dt>
            <dd>
              <a href={`tel:${CONTACT.phoneHref}`} className="link">
                {CONTACT.phoneDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt className="label">{c.linkedinLabel}</dt>
            <dd>
              <ExternalLink href={CONTACT.linkedin} notice={t.meta.newTab} className="link">
                {withoutScheme(CONTACT.linkedin)}
                <ArrowOutIcon />
              </ExternalLink>
            </dd>
          </div>
          <div>
            <dt className="label">{c.githubLabel}</dt>
            <dd>
              <ExternalLink href={CONTACT.github} notice={t.meta.newTab} className="link">
                {withoutScheme(CONTACT.github)}
                <ArrowOutIcon />
              </ExternalLink>
            </dd>
          </div>
          <div>
            <dt className="label">{c.locationLabel}</dt>
            <dd className="close__place">{c.locationValue}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
