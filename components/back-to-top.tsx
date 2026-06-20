"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type BackToTopProps = {
  label: string;
};

export function BackToTop({ label }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-24 right-4 z-50 rounded-full bg-background/90 shadow-lg md:bottom-6"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={label}
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
