export interface Dictionary {
  meta: {
    skipLink: string;
    switchLanguage: string;
    otherLanguage: string;
    newTab: string;
  };
  nav: {
    label: string;
    work: string;
    experience: string;
    skills: string;
    about: string;
    contact: string;
  };
  hero: {
    name: string;
    role: string;
    headline: string[];
    sentence: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewDemo: string;
    viewGithub: string;
    items: Array<{
      name: string;
      role: string;
      description: string;
      stack: string[];
      highlights: string[];
      links: {
        demo: string;
        github: string;
      };
      image: {
        main: string;
        mainAlt: string;
        detail?: string;
        detailAlt?: string;
      };
    }>;
  };
  experience: {
    title: string;
    items: Array<{
      company: string;
      role: string;
      period: string;
      description: string;
      stack: string[];
    }>;
    education: {
      title: string;
      school: string;
      degree: string;
      term: string;
      standing: string;
    };
  };
  skills: {
    title: string;
    intro: string;
    groups: Array<{
      title: string;
      items: string[];
    }>;
    notes: Array<{
      title: string;
      items: string[];
    }>;
  };
  about: {
    title: string;
    portraitAlt: string;
    paragraphs: string[];
  };
  contact: {
    title: string;
    statement: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    locationValue: string;
    linkedinLabel: string;
    githubLabel: string;
    cvLabel: string;
  };
  footer: {
    description: string;
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
