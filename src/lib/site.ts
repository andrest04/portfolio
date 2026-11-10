import { CONTACT } from "@/lib/contact";
import type { Dictionary } from "@/types/i18n";

/** The canonical address of the site, without a trailing slash. */
export const SITE_URL = "https://andres-torres.com";

/** The languages the content's language list states, as BCP 47 tags in the same order. */
const SPOKEN_LANGUAGES = ["es", "en"];

const UNIVERSITY = "Universidad Peruana de Ciencias Aplicadas";

/**
 * Describes Andrés to search engines using only what the page already states. He is a
 * current student, so the university is an affiliation and never a completed degree.
 */
export function personJsonLd(t: Dictionary): string {
  const [currentJob] = t.strata;

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t.hero.name,
    url: SITE_URL,
    description: t.hero.status,
    jobTitle: currentJob.role ?? undefined,
    worksFor: { "@type": "Organization", name: currentJob.company },
    affiliation: { "@type": "CollegeOrUniversity", name: UNIVERSITY },
    address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
    knowsLanguage: SPOKEN_LANGUAGES,
    sameAs: [CONTACT.linkedin, CONTACT.github],
  };

  /* Escaped so the text can never close the script element it is printed into. */
  return JSON.stringify(person).replace(/</g, "\\u003c");
}
