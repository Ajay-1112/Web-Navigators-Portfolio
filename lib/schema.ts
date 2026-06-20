import { z } from "zod";

const navItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const heroButtonSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  variant: z.enum(["default", "outline"]),
});

const projectMetricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const portfolioSchema = z.object({
  personal: z.object({
    name: z.string().min(1),
    brandName: z.string().min(1),
    title: z.string().min(1),
    subtitle: z.string().min(1),
    bio: z.string().min(1),
    available: z.boolean(),
    location: z.string().min(1),
    email: z.string().email(),
    github: z.string().url(),
    whatsapp: z.string().min(1),
    profileImage: z.string().min(1),
  }),
  navigation: z.array(navItemSchema),
  hero: z.object({
    headline: z.string().min(1),
    subheadline: z.string().min(1),
    buttons: z.array(heroButtonSchema).min(1),
    floatingBadges: z.array(z.string().min(1)).min(1),
  }),
  trustTechnologies: z.array(z.string().min(1)).min(1),
  stats: z.array(
    z.object({
      label: z.string().min(1),
      value: z.number().nonnegative(),
      suffix: z.string(),
    }),
  ),
  process: z.array(
    z.object({
      step: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
    }),
  ).min(1),
  services: z.array(
    z.object({
      slug: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
      icon: z.string().min(1),
      highlights: z.array(z.string().min(1)).min(1),
    }),
  ),
  projects: z.array(
    z.object({
      slug: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
      image: z.string().min(1),
      techStack: z.array(z.string().min(1)).min(1),
      liveUrl: z.string().url(),
      githubUrl: z.string().url().optional(),
      featured: z.boolean(),
      industry: z.string().min(1),
      timeframe: z.string().min(1),
      role: z.string().min(1),
      collaboration: z.string().min(1),
      overview: z.string().min(1),
      problem: z.string().min(1),
      solution: z.string().min(1),
      results: z.array(projectMetricSchema).min(1),
      screenshots: z.array(z.string().min(1)).min(1),
    }),
  ),
  skills: z.record(z.string(), z.array(z.string().min(1))),
  whyWorkWithMe: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      icon: z.string().min(1),
    }),
  ),
  testimonials: z.array(
    z.object({
      name: z.string().min(1),
      role: z.string().min(1),
      company: z.string().min(1),
      quote: z.string().min(1),
      avatar: z.string().min(1),
    }),
  ),
  faq: z.array(
    z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    }),
  ),
  contact: z.object({
    heading: z.string().min(1),
    subheading: z.string().min(1),
    cta: z.string().min(1),
  }),
  footer: z.object({
    copyright: z.string().min(1),
    sections: z.array(
      z.object({
        heading: z.string().min(1),
        links: z.array(navItemSchema).min(1),
      }),
    ),
  }),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    siteUrl: z.string().url(),
    ogImage: z.string().min(1),
    keywords: z.array(z.string().min(1)).min(1),
  }),
  ui: z.object({
    viewWork: z.string().min(1),
    letsTalk: z.string().min(1),
    featuredProjectsHeading: z.string().min(1),
    servicesHeading: z.string().min(1),
    trustHeading: z.string().min(1),
    whyHeading: z.string().min(1),
    testimonialsHeading: z.string().min(1),
    faqHeading: z.string().min(1),
    contactHeading: z.string().min(1),
    projectsPageTitle: z.string().min(1),
    projectsPageSubtitle: z.string().min(1),
    searchPlaceholder: z.string().min(1),
    filterLabel: z.string().min(1),
    allTechnologiesLabel: z.string().min(1),
    prevLabel: z.string().min(1),
    nextLabel: z.string().min(1),
    noProjectsTitle: z.string().min(1),
    noProjectsDescription: z.string().min(1),
    projectCta: z.string().min(1),
    githubCta: z.string().min(1),
    liveCta: z.string().min(1),
    backToTop: z.string().min(1),
    commandPlaceholder: z.string().min(1),
    commandTitle: z.string().min(1),
    commandDescription: z.string().min(1),
    commandProjects: z.string().min(1),
    commandServices: z.string().min(1),
    commandContact: z.string().min(1),
    commandTheme: z.string().min(1),
    commandOpen: z.string().min(1),
    contactSuccess: z.string().min(1),
    contactError: z.string().min(1),
    contactSending: z.string().min(1),
    aboutHeading: z.string().min(1),
    aboutSubtitle: z.string().min(1),
    processHeading: z.string().min(1),
    processSubtitle: z.string().min(1),
    hireMeLabel: z.string().min(1),
    availableLabel: z.string().min(1),
    namePlaceholder: z.string().min(1),
    emailPlaceholder: z.string().min(1),
    projectDetailsPlaceholder: z.string().min(1),
    whatsappLabel: z.string().min(1),
    projectOverviewLabel: z.string().min(1),
    projectProblemLabel: z.string().min(1),
    projectSolutionLabel: z.string().min(1),
    projectGalleryLabel: z.string().min(1),
    projectCollaborationLabel: z.string().min(1),
  }),
});

export type PortfolioSchema = z.infer<typeof portfolioSchema>;
