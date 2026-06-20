"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

import type { PortfolioData } from "@/types/portfolio";
import { Carousel } from "@/components/ui/carousel";
import { SectionShell } from "./section-shell";

type TestimonialsSectionProps = {
  data: PortfolioData;
};

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  return (
    <SectionShell
      eyebrow="Testimonials"
      title={data.ui.testimonialsHeading}
      subtitle="What clients say about working together."
      centered
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <Carousel
          items={data.testimonials}
          renderItem={(testimonial) => (
            <div
              key={testimonial.name}
              className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10"
            >
              <Quote className="size-8 text-primary/40" />
              <p className="mt-4 text-lg leading-relaxed text-foreground md:text-xl">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="relative size-12 overflow-hidden rounded-full ring-2 ring-primary/30">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-foreground/70">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          )}
        />
      </motion.div>
    </SectionShell>
  );
}
