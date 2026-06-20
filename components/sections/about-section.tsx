"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GitHubIcon } from "@/components/icons/social-icons";
import { TechStackIcons } from "@/components/ui/tech-stack-icons";
import type { PortfolioData } from "@/types/portfolio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionShell } from "./section-shell";

type AboutSectionProps = {
  data: PortfolioData;
};

export function AboutSection({ data }: AboutSectionProps) {
  const categories = Object.entries(data.skills);
  const firstCategory = categories[0]?.[0] ?? "skills";

  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title={data.ui.aboutHeading}
      subtitle={data.ui.aboutSubtitle}
    >
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="relative mx-auto w-fit lg:mx-0">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary via-primary/50 to-accent opacity-60 blur-lg" />
            <div className="relative size-48 overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl">
              <Image
                src={data.personal.profileImage}
                alt={data.personal.name}
                fill
                className="object-cover object-top"
                sizes="192px"
                priority
              />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h3 className="font-heading text-xl font-bold text-foreground">{data.personal.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{data.personal.location}</p>
          </div>

          <div className="flex justify-center gap-2 lg:justify-start">
            <Link
              href={`mailto:${data.personal.email}`}
              className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-foreground/70 shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
              aria-label="Email"
            >
              <Mail className="size-4" />
            </Link>
            <Link
              href={data.personal.github}
              target="_blank"
              rel="noreferrer"
              className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-foreground/70 shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
              aria-label="GitHub"
            >
              <GitHubIcon className="size-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-base leading-relaxed text-foreground/75 md:text-lg">
            {data.personal.bio}
          </p>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              Tech Stack
            </h4>
            <Tabs defaultValue={firstCategory} className="w-full">
              <TabsList className="mb-6 h-auto w-full flex-wrap justify-start gap-2 bg-muted/50 p-1.5">
                {categories.map(([category]) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-md px-4 py-2 capitalize text-foreground/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              {categories.map(([category, items]) => (
                <TabsContent key={category} value={category}>
                  <TechStackIcons technologies={items} size="md" showLabels layout="grid" />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
