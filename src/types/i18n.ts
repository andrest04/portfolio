/** A position on the depth rail: the year in large type and a short note under it. */
export interface Tick {
  year: string;
  note: string;
}

export interface Stratum {
  id: string;
  tick: Tick;
  /** The period in words, as shown beside the heading. */
  period: string;
  company: string;
  /** Null when the period has no employer. */
  role: string | null;
  location: string;
  points: string[];
  /** Ids of the projects that began in this period, in page order. May be empty. */
  projects: string[];
}

export interface Project {
  id: string;
  name: string;
  period: string;
  what: string;
  did: string;
  facts: string[];
  tech: string[];
  links: {
    live: string | null;
    github: string | null;
  };
  /** A real screenshot of the project, shown whole. */
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    skipLink: string;
    switchLanguage: string;
    otherLanguage: string;
    newTab: string;
  };
  nav: {
    label: string;
    experience: string;
    education: string;
    contact: string;
  };
  rail: {
    label: string;
    title: string[];
    jump: string;
    cv: string;
    contact: string;
  };
  hero: {
    name: string;
    headline: string;
    datum: string;
    status: string;
    ctaPrimary: string;
    ctaSecondary: string;
    below: string;
  };
  record: {
    sample: string;
    did: string;
    facts: string;
    tech: string;
    live: string;
    github: string;
  };
  strata: Stratum[];
  projects: Project[];
  bedrock: {
    id: string;
    tick: Tick;
    period: string;
    school: string;
    degree: string;
    details: string[];
    certifications: {
      title: string;
      items: Array<{
        name: string;
        issuer: string;
        date: string;
      }>;
    };
    languages: {
      title: string;
      items: Array<{
        name: string;
        level: string;
      }>;
    };
    skills: {
      title: string;
      groups: Array<{
        title: string;
        items: string[];
      }>;
    };
  };
  contact: {
    id: string;
    statement: string;
    lead: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    locationValue: string;
    linkedinLabel: string;
    githubLabel: string;
    cvLabel: string;
  };
  footer: {
    signature: string;
    status: string;
  };
  cv: {
    missing: string;
    failed: string;
  };
  error: {
    title: string;
    body: string;
    errorId: string;
    retry: string;
    home: string;
  };
  notFound: {
    title: string;
    body: string;
    home: string;
  };
}
