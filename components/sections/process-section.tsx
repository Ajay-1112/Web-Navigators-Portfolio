"use client";

import { motion } from "framer-motion";

import type { PortfolioData } from "@/types/portfolio";
import { SectionShell } from "./section-shell";

type ProcessSectionProps = {
  data: PortfolioData;
};

export function ProcessSection({ data }: ProcessSectionProps) {
  return (
    <SectionShell
      eyebrow="Process"
      title={data.ui.processHeading}
      subtitle={data.ui.processSubtitle}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.process.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="group relative"
          >
            {index < data.process.length - 1 ? (
              <div className="absolute left-[calc(50%+2rem)] top-8 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-primary/40 to-transparent lg:block" />
            ) : null}
            <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
              <span className="font-heading text-3xl font-bold text-primary/50 transition-colors group-hover:text-primary">
                {step.step}
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
