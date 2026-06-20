export type TechIconConfig = {
  slug: string;
  color?: string;
  darkBg?: boolean;
};

const TECH_ICON_MAP: Record<string, TechIconConfig> = {
  React: { slug: "react", color: "61DAFB" },
  "Next.js": { slug: "nextdotjs", color: "000000" },
  TypeScript: { slug: "typescript", color: "3178C6" },
  "Node.js": { slug: "nodedotjs", color: "339933" },
  MongoDB: { slug: "mongodb", color: "47A248" },
  Prisma: { slug: "prisma", color: "2D3748" },
  PostgreSQL: { slug: "postgresql", color: "4169E1" },
  "Tailwind CSS": { slug: "tailwindcss", color: "06B6D4" },
  "Framer Motion": { slug: "framer", color: "0055FF" },
  Express: { slug: "express", color: "000000" },
  Stripe: { slug: "stripe", color: "635BFF" },
  Playwright: { slug: "playwright", color: "2EAD33" },
  "GitHub Actions": { slug: "githubactions", color: "2088FF" },
  "CI/CD": { slug: "githubactions", color: "2088FF" },
  "Performance Optimization": { slug: "pagespeedinsights", color: "4285F4" },
  "Scalable Architecture": { slug: "docker", color: "2496ED" },
  Monitoring: { slug: "grafana", color: "F46800" },
};

export function getTechIcon(tech: string): TechIconConfig {
  return TECH_ICON_MAP[tech] ?? { slug: "devdotto", color: "0A0A0A" };
}

export function getTechIconUrl(tech: string): string {
  const { slug, color } = getTechIcon(tech);
  return color
    ? `https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`
    : `https://cdn.simpleicons.org/${slug}`;
}

export function getTechDisplayName(tech: string): string {
  return tech;
}
