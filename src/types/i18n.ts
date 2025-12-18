export interface Dictionary {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaTertiary: string;
    highlightsTitle: string;
    highlights: string[];
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
    }>;
  };
  about: {
    title: string;
    subtitle: string;
    cards: Array<{
      title: string;
      items: string[];
    }>;
    principleLabel: string;
    principleText: string;
  };
  skills: {
    title: string;
    subtitle: string;
    groups: Array<{
      title: string;
      items: string[];
    }>;
    strengthsTitle: string;
    strengths: string[];
  };
  contact: {
    title: string;
    cardTitle: string;
    cardSubtitle: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    locationValue: string;
    socialTitle: string;
    linkedinLabel: string;
    githubLabel: string;
  };
  nav: {
    projects: string;
    about: string;
    skills: string;
    contact: string;
  };
  footer: {
    text: string;
    rights: string;
  };
}
