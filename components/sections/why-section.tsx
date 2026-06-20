"use client";

import { motion } from "framer-motion";

import type { PortfolioData } from "@/types/portfolio";
import { getIcon } from "@/lib/icons";
import { SectionShell } from "./section-shell";

type WhySectionProps = {
  data: PortfolioData;
};

export function WhySection({ data }: WhySectionProps) {
  return (
    <SectionShell
      eyebrow="Why Me"
      title={data.ui.whyHeading}
      subtitle="What sets me apart when you're choosing a developer to trust with your product."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.whyWorkWithMe.map((item, index) => {
          const Icon = getIcon(item.icon);
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-heading font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
