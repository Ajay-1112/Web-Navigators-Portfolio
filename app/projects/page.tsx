import { ProjectsClient } from "@/app/projects/projects-client";
import { getPortfolioData } from "@/lib/portfolio";

export default async function ProjectsPage() {
  const data = await getPortfolioData();
  return <ProjectsClient data={data} />;
}
