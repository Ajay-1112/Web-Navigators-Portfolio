import type { MetadataRoute } from "next";

import { getPortfolioData } from "@/lib/portfolio";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const data = await getPortfolioData();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${data.seo.siteUrl}/sitemap.xml`,
  };
}
