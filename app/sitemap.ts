import type { MetadataRoute } from "next";

import { getPortfolioData } from "@/lib/portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getPortfolioData();

  return [
    {
      url: data.seo.siteUrl,
      priority: 1,
    },
    {
      url: `${data.seo.siteUrl}/projects`,
      priority: 0.9,
    },
    ...data.projects.map((project) => ({
      url: `${data.seo.siteUrl}/projects/${project.slug}`,
      priority: 0.8,
    })),
  ];
}
