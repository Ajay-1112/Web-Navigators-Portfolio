"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { getIcon } from "@/lib/icons";
import type { PortfolioData } from "@/types/portfolio";
import { SectionShell } from "./section-shell";

type ServicesSectionProps = {
  data: PortfolioData;
};

export function ServicesSection({ data }: ServicesSectionProps) {
  const topRow = data.services.slice(0, 3);
  const bottomRow = data.services.slice(3);

  return (
    <section id="services" className="relative border-y border-border bg-secondary/40 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.52_0.13_175/0.06),transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Services
          </p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">{data.ui.servicesHeading}</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            Outcome-focused development services tailored for startups, agencies, and growing SaaS
            teams.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {topRow.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          {bottomRow.length > 0 ? (
            <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
              {bottomRow.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

type ServiceCardProps = {
  service: PortfolioData["services"][number];
};

function ServiceCard({ service }: ServiceCardProps) {
  const Icon = getIcon(service.icon);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="group"
    >
      <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-5" />
          </div>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
        </div>

        <h3 className="font-heading text-lg font-bold">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>

        <ul className="mt-5 flex flex-1 flex-col gap-2 border-t border-border/30 pt-5">
          {service.highlights.map((point) => (
            <li key={point} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <span className="size-1 shrink-0 rounded-full bg-primary/70" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
