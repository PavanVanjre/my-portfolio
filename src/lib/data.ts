import portfolioData from '../data/portfolio.json';

export interface PortfolioData {
  hero: {
    greeting: string;
    name: string;
    title: string;
    roles: string[];
    description: string;
    buttons: {
      primary: string;
      secondary: string;
    };
    socialLinks: Array<{
      name: string;
      url: string;
      icon: string;
    }>;
  };
  about: {
    title: string;
    subtitle: string;
    content: string[];
  };
  skills: {
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      icon: string;
      color: string;
    }>;
  };
  experience: {
    title: string;
    items: Array<{
      title: string;
      company: string;
      period: string;
      description: string[];
      technologies: string[];
      year: string;
    }>;
  };
  education: {
    title: string;
    subtitle: string;
    items: Array<{
      degree: string;
      school: string;
      period: string;
      location: string;
      description: string;
      courses: string[];
      year: string;
    }>;
  };
  certifications: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      issuer: string;
      date: string;
      credentialId: string;
      description: string;
      skills: string[];
      link: string;
      color: string;
    }>;
  };
  projects: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      tech: string[];
      image: string;
      github: string;
      live: string | null;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    heading: string;
    description: string;
    contactInfo: Array<{
      type: string;
      value: string;
      link: string | null;
      icon: string;
    }>;
    form: {
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      message: {
        label: string;
        placeholder: string;
      };
      submit: string;
    };
  };
}

export const getPortfolioData = (): PortfolioData => {
  return portfolioData as PortfolioData;
};

export const getSectionData = <K extends keyof PortfolioData>(section: K): PortfolioData[K] => {
  return portfolioData[section] as PortfolioData[K];
}; 