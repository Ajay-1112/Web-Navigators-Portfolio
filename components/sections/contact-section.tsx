"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin } from "lucide-react";
import Link from "next/link";

import type { PortfolioData } from "@/types/portfolio";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionShell } from "./section-shell";

type ContactSectionProps = {
  data: PortfolioData;
};

export function ContactSection({ data }: ContactSectionProps) {
  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title={data.ui.contactHeading}
      subtitle="Tell me about your project — I'll respond within 24 hours with next steps."
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        className="grid gap-8 lg:grid-cols-[1fr_1.2fr]"
      >
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-heading text-2xl font-bold text-foreground">{data.contact.heading}</h3>
            <p className="mt-3 leading-relaxed text-foreground/70">{data.contact.subheading}</p>
          </div>

          <div className="space-y-3">
            <Link
              href={`mailto:${data.personal.email}`}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/30"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="size-4" />
              </span>
              <div>
                <p className="text-xs text-foreground/60">Email</p>
                <p className="text-sm font-medium text-foreground">{data.personal.email}</p>
              </div>
            </Link>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="size-4" />
              </span>
              <div>
                <p className="text-xs text-foreground/60">Location</p>
                <p className="text-sm font-medium text-foreground">{data.personal.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="size-4" />
              </span>
              <div>
                <p className="text-xs text-foreground/60">Response time</p>
                <p className="text-sm font-medium text-foreground">Within 24 hours</p>
              </div>
            </div>
          </div>

          
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          <ContactForm
            labels={{
              cta: data.contact.cta,
              success: data.ui.contactSuccess,
              error: data.ui.contactError,
              sending: data.ui.contactSending,
              namePlaceholder: data.ui.namePlaceholder,
              emailPlaceholder: data.ui.emailPlaceholder,
              projectDetailsPlaceholder: data.ui.projectDetailsPlaceholder,
            }}
          />
        </div>
      </motion.div>
    </SectionShell>
  );
}
