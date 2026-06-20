"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { PortfolioData } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechStackIcons } from "@/components/ui/tech-stack-icons";
import { SectionShell } from "./section-shell";

type ProjectsSectionProps = {
  data: PortfolioData;
};

export function ProjectsSection({ data }: ProjectsSectionProps) {
  const featuredProjects = data.projects.filter((project) => project.featured).slice(0, 3);

  return (
    <SectionShell
      eyebrow="Portfolio"
      title={data.ui.featuredProjectsHeading}
      subtitle="Real client work — from marine e-commerce to technology consultancy platforms."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group"
          >
            <div className="rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2 bg-primary/20 text-primary">
                      {project.industry}
                    </Badge>
                    <h3 className="font-heading text-lg font-bold">{project.title}</h3>
                  </div>
                  <span className="rounded-lg bg-background/80 px-2 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                    {project.timeframe}
                  </span>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <p className="text-xs text-primary">{project.collaboration}</p>
                <TechStackIcons technologies={project.techStack} limit={6} size="sm" />
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.githubUrl ? (
                    <Button asChild variant="outline" size="sm" className="rounded-lg">
                      <Link href={project.githubUrl} target="_blank" rel="noreferrer">
                        <GitBranch className="h-3.5 w-3.5" />
                        {data.ui.githubCta}
                      </Link>
                    </Button>
                  ) : null}
                  <Button asChild variant="outline" size="sm" className="rounded-lg">
                    <Link href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-3.5 w-3.5" />
                      {data.ui.liveCta}
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="ml-auto rounded-lg">
                    <Link href={`/projects/${project.slug}`}>
                      {data.ui.projectCta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
