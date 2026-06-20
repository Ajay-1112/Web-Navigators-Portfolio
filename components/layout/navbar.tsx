"use client";

import { ArrowUpRight, Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ContactLink } from "@/components/contact-link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { PortfolioData } from "@/types/portfolio";

type NavbarProps = {
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

export function Navbar({ data }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const withHomePrefix = (href: string) => (href.startsWith("#") ? `/${href}` : href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/95 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-background/80 backdrop-blur-md",
      )}
    >
      <nav className="mx-auto flex h-16 w-full items-center justify-between px-4 md:h-[4.5rem] md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            {getBrandInitials(data.personal.brandName)}
          </span>
          <span className="hidden font-heading text-base font-bold sm:block">
            {data.personal.brandName}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {data.navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : item.href.startsWith("#")
                  ? pathname === "/" && item.href === "#contact"
                  : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={withHomePrefix(item.href)}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground",
                  active && "bg-muted/60 text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="outline"
            size="icon"
            aria-label={data.ui.commandOpen}
            onClick={() => window.dispatchEvent(new Event("open-command-menu"))}
            className="rounded-xl"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button asChild size="lg" className="rounded-xl shadow-lg shadow-primary/25">
            <ContactLink>
              {data.ui.hireMeLabel}
              <ArrowUpRight className="h-4 w-4" />
            </ContactLink>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button asChild size="sm" className="rounded-xl">
            <ContactLink>{data.ui.hireMeLabel}</ContactLink>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="rounded-xl">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{data.personal.brandName}</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-2">
                {data.navigation.map((item) => (
                  <Link
                    key={item.label}
                    href={withHomePrefix(item.href)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
