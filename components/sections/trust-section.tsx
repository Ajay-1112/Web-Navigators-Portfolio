"use client";

import { motion } from "framer-motion";

import type { PortfolioData } from "@/types/portfolio";
import { Marquee } from "@/components/ui/marquee";
import { TechStackIcons } from "@/components/ui/tech-stack-icons";

type TrustSectionProps = {
  data: PortfolioData;
};

export function TrustSection({ data }: TrustSectionProps) {
  const items = [...data.trustTechnologies, ...data.trustTechnologies];

  return (
    <section className="border-y border-border/40 bg-muted/20 py-10">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {data.ui.trustHeading}
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <Marquee pauseOnHover className="[--duration:40s]">
            {items.map((tech, index) => (
              <div key={`${tech}-${index}`} className="mx-4">
                <TechStackIcons technologies={[tech]} size="lg" showLabels />
              </div>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
}
