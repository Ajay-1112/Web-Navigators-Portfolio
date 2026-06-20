"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CarouselProps<T> = {
  items: T[];
  className?: string;
  renderItem: (item: T, index: number) => React.ReactNode;
};

export function Carousel<T>({ items, className, renderItem }: CarouselProps<T>) {
  const [index, setIndex] = useState(0);
  const hasItems = items.length > 0;

  const visibleItems = useMemo(() => {
    if (!hasItems) return [];
    return [items[index]];
  }, [hasItems, index, items]);

  const goPrev = () => setIndex((current) => (current - 1 + items.length) % items.length);
  const goNext = () => setIndex((current) => (current + 1) % items.length);

  useEffect(() => {
    if (!hasItems || items.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [hasItems, items.length]);

  return (
    <div className={cn("space-y-4", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {visibleItems.map((item, i) => renderItem(item, i))}
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {hasItems ? `${index + 1}/${items.length}` : "0/0"}
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="outline" onClick={goPrev} disabled={!hasItems}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={goNext} disabled={!hasItems}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
