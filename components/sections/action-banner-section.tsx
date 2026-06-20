"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ContactLink } from "@/components/contact-link";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import type { PortfolioData } from "@/types/portfolio";

type ActionBannerSectionProps = {
  data: PortfolioData;
};

export function ActionBannerSection({ data }: ActionBannerSectionProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/8 via-card to-accent/10 p-8 shadow-sm md:p-12"
      >
        <BorderBeam size={180} duration={10} colorFrom="#0d9488" colorTo="#0891b2" />
        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Let&apos;s collaborate
            </p>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">{data.contact.heading}</h2>
            <p className="max-w-xl text-muted-foreground">{data.contact.subheading}</p>
          </div>
          <Button asChild size="lg" className="rounded-xl px-8 shadow-lg shadow-primary/25">
            <ContactLink>
              {data.contact.cta}
              <ArrowRight className="h-4 w-4" />
            </ContactLink>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
