export type NavItem = {
  label: string;
  href: string;
};

export type HeroButton = {
  label: string;
  href: string;
  variant: "default" | "outline";
};

export type HeroContent = {
  headline: string;
  subheadline: string;
  buttons: HeroButton[];
  floatingBadges: string[];
};

export type PersonalInfo = {
  name: string;
  brandName: string;
  title: string;
  subtitle: string;
  bio: string;
  available: boolean;
  location: string;
  email: string;
  github: string;
  whatsapp: string;
  profileImage: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type StatItem = {
  label: string;
  value: number;
  suffix: string;
};

export type ServiceItem = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
  industry: string;
  timeframe: string;
  role: string;
  collaboration: string;
  overview: string;
  problem: string;
  solution: string;
  results: ProjectMetric[];
  screenshots: string[];
};

export type WhyItem = {
  title: string;
  description: string;
  icon: string;
};

export type TestimonialItem = {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContactContent = {
  heading: string;
  subheading: string;
  cta: string;
};

export type FooterSection = {
  heading: string;
  links: NavItem[];
};

export type SeoContent = {
  title: string;
  description: string;
  siteUrl: string;
  ogImage: string;
  keywords: string[];
};

export type UiLabels = {
  viewWork: string;
  letsTalk: string;
  featuredProjectsHeading: string;
  servicesHeading: string;
  trustHeading: string;
  whyHeading: string;
  testimonialsHeading: string;
  faqHeading: string;
  contactHeading: string;
  projectsPageTitle: string;
  projectsPageSubtitle: string;
  searchPlaceholder: string;
  filterLabel: string;
  allTechnologiesLabel: string;
  prevLabel: string;
  nextLabel: string;
  noProjectsTitle: string;
  noProjectsDescription: string;
  projectCta: string;
  githubCta: string;
  liveCta: string;
  backToTop: string;
  commandPlaceholder: string;
  commandTitle: string;
  commandDescription: string;
  commandProjects: string;
  commandServices: string;
  commandContact: string;
  commandTheme: string;
  commandOpen: string;
  contactSuccess: string;
  contactError: string;
  contactSending: string;
  aboutHeading: string;
  aboutSubtitle: string;
  processHeading: string;
  processSubtitle: string;
  hireMeLabel: string;
  availableLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  projectDetailsPlaceholder: string;
  whatsappLabel: string;
  projectOverviewLabel: string;
  projectProblemLabel: string;
  projectSolutionLabel: string;
  projectGalleryLabel: string;
  projectCollaborationLabel: string;
};

export type PortfolioData = {
  personal: PersonalInfo;
  navigation: NavItem[];
  hero: HeroContent;
  trustTechnologies: string[];
  stats: StatItem[];
  process: ProcessStep[];
  services: ServiceItem[];
  projects: ProjectItem[];
  skills: Record<string, string[]>;
  whyWorkWithMe: WhyItem[];
  testimonials: TestimonialItem[];
  faq: FaqItem[];
  contact: ContactContent;
  footer: {
    copyright: string;
    sections: FooterSection[];
  };
  seo: SeoContent;
  ui: UiLabels;
};
