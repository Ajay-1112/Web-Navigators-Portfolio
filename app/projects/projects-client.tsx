"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, GitBranch, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { PortfolioData } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { TechStackIcons } from "@/components/ui/tech-stack-icons";

const PAGE_SIZE = 6;

type ProjectsClientProps = {
  data: PortfolioData;
};

export function ProjectsClient({ data }: ProjectsClientProps) {
  const [query, setQuery] = useState("");
  const [technology, setTechnology] = useState(data.ui.allTechnologiesLabel);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const technologies = useMemo(
    () => [
      data.ui.allTechnologiesLabel,
      ...Array.from(new Set(data.projects.flatMap((project) => project.techStack))),
    ],
    [data.projects, data.ui.allTechnologiesLabel],
  );

  const filteredProjects = useMemo(() => {
    const term = query.toLowerCase();
    return data.projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(term) ||
        project.industry.toLowerCase().includes(term) ||
        project.collaboration.toLowerCase().includes(term) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(term));
      const matchesTechnology =
        technology === data.ui.allTechnologiesLabel || project.techStack.includes(technology);
      return matchesSearch && matchesTechnology;
    });
  }, [data.projects, data.ui.allTechnologiesLabel, query, technology]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [query, technology]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    if (loading) return () => clearTimeout(timer);
    return undefined;
  }, [loading]);

  const paginatedProjects = filteredProjects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-16 md:px-6">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold md:text-5xl">{data.ui.projectsPageTitle}</h1>
        <p className="text-muted-foreground">{data.ui.projectsPageSubtitle}</p>
      </div>

      <div className="grid gap-4 rounded-2xl border border-border/60 bg-card/60 p-4 md:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => {
              setLoading(true);
              setQuery(event.target.value);
            }}
            placeholder={data.ui.searchPlaceholder}
            className="pl-10"
          />
        </div>
        <select
          value={technology}
          onChange={(event) => {
            setLoading(true);
            setTechnology(event.target.value);
          }}
          className="h-10 rounded-md border border-border/70 bg-background px-3 text-sm"
          aria-label={data.ui.filterLabel}
        >
          {technologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="skeletons" className="grid gap-5 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="space-y-3 rounded-2xl border border-border/60 p-4">
                <Skeleton className="h-44 w-full" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid gap-5 md:grid-cols-2"
          >
            {paginatedProjects.map((project) => (
              <Card key={project.slug} className="overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-heading text-lg">{project.title}</CardTitle>
                    <Badge variant="outline">{project.industry}</Badge>
                  </div>
                  <p className="text-xs text-primary">{project.collaboration}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <TechStackIcons technologies={project.techStack} limit={5} size="sm" />
                </CardContent>
                <CardFooter className="justify-between gap-2">
                  {project.githubUrl ? (
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.githubUrl} target="_blank" rel="noreferrer">
                        <GitBranch className="h-4 w-4" />
                        {data.ui.githubCta}
                      </Link>
                    </Button>
                  ) : null}
                  <Button asChild variant="outline" size="sm">
                    <Link href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {data.ui.liveCta}
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="ml-auto">
                    <Link href={`/projects/${project.slug}`}>{data.ui.projectCta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && filteredProjects.length === 0 && (
        <div className="rounded-2xl border border-border/70 p-8 text-center">
          <h3 className="text-lg font-semibold">{data.ui.noProjectsTitle}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{data.ui.noProjectsDescription}</p>
        </div>
      )}

      {filteredProjects.length > 0 && (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page <= 1}
          >
            {data.ui.prevLabel}
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={page >= totalPages}
          >
            {data.ui.nextLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
