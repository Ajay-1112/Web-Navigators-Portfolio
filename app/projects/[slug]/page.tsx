import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, GitBranch } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TechStackIcons } from "@/components/ui/tech-stack-icons";
import { getPortfolioData, getProjectBySlug } from "@/lib/portfolio";
import { buildProjectMetadata } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [data, project] = await Promise.all([getPortfolioData(), getProjectBySlug(slug)]);
  if (!project) return {};
  return buildProjectMetadata(data, project);
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [data, project] = await Promise.all([getPortfolioData(), getProjectBySlug(slug)]);
  if (!project) notFound();

  return (
    <article className="mx-auto w-full max-w-6xl space-y-10 px-4 py-16 md:px-6">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{project.industry}</Badge>
          <Badge variant="outline">{project.role}</Badge>
          <span className="text-sm text-muted-foreground">{project.timeframe}</span>
        </div>
        <h1 className="font-heading text-3xl font-bold md:text-5xl">{project.title}</h1>
        <p className="max-w-3xl text-muted-foreground">{project.description}</p>
        <p className="text-sm text-primary">{project.collaboration}</p>
        <TechStackIcons technologies={project.techStack} size="md" showLabels />
      </header>

      <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-border/60">
        <Image src={project.image} alt={project.title} fill className="object-cover" priority />
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        {project.results.map((result) => (
          <Card key={result.label} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="font-heading text-lg">{result.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{result.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Separator />

      <section className="grid gap-8 md:grid-cols-3">
        <div>
          <h2 className="font-heading text-xl font-bold">{data.ui.projectOverviewLabel}</h2>
          <p className="mt-2 text-muted-foreground">{project.overview}</p>
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold">{data.ui.projectProblemLabel}</h2>
          <p className="mt-2 text-muted-foreground">{project.problem}</p>
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold">{data.ui.projectSolutionLabel}</h2>
          <p className="mt-2 text-muted-foreground">{project.solution}</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-bold">{data.ui.projectGalleryLabel}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {project.screenshots.map((screenshot) => (
            <div
              key={screenshot}
              className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/60"
            >
              <Image
                src={screenshot}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-2xl p-6 md:p-8">
        <h2 className="font-heading text-2xl font-bold">{data.contact.heading}</h2>
        <p className="mt-2 text-muted-foreground">{data.contact.subheading}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild className="rounded-xl">
            <Link href={project.liveUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" />
              {data.ui.liveCta}
            </Link>
          </Button>
          {project.githubUrl ? (
            <Button asChild variant="outline" className="rounded-xl">
              <Link href={project.githubUrl} target="_blank" rel="noreferrer">
                <GitBranch className="h-4 w-4" />
                {data.ui.githubCta}
              </Link>
            </Button>
          ) : null}
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/#contact">{data.ui.letsTalk}</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
