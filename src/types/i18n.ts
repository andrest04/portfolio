export interface Dictionary {
  experience: {
    title: string;
    subtitle: string;
    current: string;
    items: Array<{
      company: string;
      role: string;
      period: string;
      description: string;
      stack: string[];
    }>;
  };
  hero: {
    name: string;
    role: string;
    title: string;
    subtitle: string;
    currentPosition: string;
    currentCompany: string;
    stack: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    ctaTertiary: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewDemo: string;
    viewGithub: string;
    featured: string;
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
  aboutSkills: {
    title: string;
    subtitle: string;
    education: {
      title: string;
      items: string[];
    };
    focus: {
      title: string;
      items: string[];
    };
    teamwork: {
      title: string;
      items: string[];
    };
    principle: {
      label: string;
      text: string;
    };
    skills: Array<{
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
    hero: string;
    experience: string;
    projects: string;
    aboutSkills: string;
    contact: string;
  };
  footer: {
    text: string;
    rights: string;
  };
}
