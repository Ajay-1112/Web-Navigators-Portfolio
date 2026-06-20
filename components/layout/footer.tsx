import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

import { ContactLink } from "@/components/contact-link";
import { Separator } from "@/components/ui/separator";
import type { PortfolioData } from "@/types/portfolio";

type FooterProps = {
  data: PortfolioData;
};

function getBrandInitials(brandName: string) {
  return brandName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function withHomePrefix(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export function Footer({ data }: FooterProps) {
  return (
    <footer className="mt-auto w-full border-t border-border bg-background">
      <div className="mx-auto w-full px-4 py-14 md:px-6 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-5 sm:col-span-2 lg:col-span-5">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                {getBrandInitials(data.personal.brandName)}
              </span>
              <span className="font-heading text-lg font-bold text-foreground">
                {data.personal.brandName}
              </span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-foreground/70">
              {data.personal.subtitle}
            </p>
            <ContactLink className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90">
              Start a project
              <ArrowUpRight className="size-3.5" />
            </ContactLink>
          </div>

          {data.footer.sections.map((section) => (
            <div key={section.heading} className="lg:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {section.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={withHomePrefix(link.href)}
                      className="text-sm text-foreground/70 transition-colors hover:text-primary"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href={`mailto:${data.personal.email}`}
                  className="inline-flex items-start gap-2.5 text-sm text-foreground/70 transition-colors hover:text-primary"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-primary/80" />
                  <span>{data.personal.email}</span>
                </Link>
              </li>
              <li className="inline-flex items-start gap-2.5 text-sm text-foreground/70">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary/80" />
                <span>{data.personal.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-foreground/60">{data.footer.copyright}</p>
          <p className="text-sm text-foreground/60">
            Built by <span className="font-medium text-foreground/80">{data.personal.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
