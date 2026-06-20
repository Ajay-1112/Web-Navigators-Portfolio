import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";

import { portfolioSchema } from "@/lib/schema";
import type { PortfolioData, ProjectItem } from "@/types/portfolio";

const portfolioPath = path.join(process.cwd(), "data", "portfolio.json");

export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  const file = await fs.readFile(portfolioPath, "utf-8");
  const parsed = JSON.parse(file) as unknown;
  return portfolioSchema.parse(parsed);
});

export const getProjectBySlug = async (
  slug: string,
): Promise<ProjectItem | null> => {
  const data = await getPortfolioData();
  return data.projects.find((project) => project.slug === slug) ?? null;
};
