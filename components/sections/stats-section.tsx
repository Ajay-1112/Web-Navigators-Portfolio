"use client";

import { motion } from "framer-motion";

import type { StatItem } from "@/types/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import { NumberTicker } from "@/components/ui/number-ticker";

type CounterProps = {
  item: StatItem;
};

function Counter({ item }: CounterProps) {
  return (
    <MagicCard
      className="rounded-lg border border-border/60 bg-card/80"
      gradientFrom="#818cf8"
      gradientTo="#2dd4bf"
    >
      <Card className="border-0 bg-transparent shadow-none">
        <CardContent className="pt-6">
          <motion.p className="text-3xl font-semibold">
            <NumberTicker value={item.value} className="text-3xl font-semibold text-foreground" />
            {item.suffix}
          </motion.p>
          <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
        </CardContent>
      </Card>
    </MagicCard>
  );
}

type StatsSectionProps = {
  stats: StatItem[];
};

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <motion.div key={item.label} whileHover={{ y: -4 }}>
            <Counter item={item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
