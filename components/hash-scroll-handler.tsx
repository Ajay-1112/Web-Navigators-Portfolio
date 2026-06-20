"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { scrollToContactSection } from "@/components/contact-link";

export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" || window.location.hash !== "#contact") return;

    const timer = window.setTimeout(() => {
      scrollToContactSection();
    }, 150);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
