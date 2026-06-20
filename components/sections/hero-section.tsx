"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ContactLink } from "@/components/contact-link";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TechStackIcons } from "@/components/ui/tech-stack-icons";
import { cn } from "@/lib/utils";
import type { PortfolioData } from "@/types/portfolio";

type HeroSectionProps = {
  data: PortfolioData;
};

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 size-[500px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute -right-20 top-40 size-[400px] rounded-full bg-accent/20 blur-[80px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12 md:px-6 md:pb-28 md:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-7"
          >
            <div className="flex flex-wrap items-center gap-3">
              {data.personal.available ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary">
                  <span className="size-2 rounded-full bg-primary animate-pulse-glow" />
                  {data.ui.availableLabel}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                {data.personal.location}
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
                {data.personal.title}
              </p>
              <h1 className="text-4xl font-bold leading-[1.08] md:text-5xl lg:text-6xl">
                <span className="text-gradient">{data.hero.headline}</span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {data.hero.subheadline}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {data.hero.buttons.map((button) => {
                const isContact = button.href === "#contact" || button.href === "/#contact";
                const CtaLink = isContact ? ContactLink : Link;

                return (
                  <Button
                    key={button.label}
                    asChild
                    size="lg"
                    variant={button.variant}
                    className="rounded-xl px-6 shadow-lg shadow-primary/20"
                  >
                    <CtaLink href={isContact ? "/#contact" : button.href}>
                      {button.label}
                      <ArrowRight className="h-4 w-4" />
                    </CtaLink>
                  </Button>
                );
              })}
            </div>

            <div className="grid gap-2.5 pt-2">
              {data.whyWorkWithMe.slice(0, 3).map((item) => (
                <div key={item.title} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 shrink-0 text-primary" />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-3 sm:grid-cols-2"
          >
            {data.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={cn(
                  "rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md",
                  index === 0 && "sm:col-span-2",
                )}
              >
                <p className="font-heading text-4xl font-bold text-foreground md:text-5xl">
                  <NumberTicker value={stat.value} className="font-heading text-4xl font-bold text-foreground md:text-5xl" />
                  <span className="text-primary">{stat.suffix}</span>
                </p>
                <p className="mt-2 text-sm text-foreground/70">{stat.label}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:col-span-2"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                {data.ui.trustHeading}
              </p>
              <TechStackIcons technologies={data.trustTechnologies} limit={6} size="sm" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
