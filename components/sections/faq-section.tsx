import type { PortfolioData } from "@/types/portfolio";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionShell } from "./section-shell";

type FaqSectionProps = {
  data: PortfolioData;
};

export function FaqSection({ data }: FaqSectionProps) {
  return (
    <SectionShell
      eyebrow="FAQ"
      title={data.ui.faqHeading}
      subtitle="Common questions from potential clients."
    >
      <Accordion type="single" collapsible className="w-full space-y-2">
        {data.faq.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={`item-${index}`}
            className="rounded-xl border border-border bg-card px-5 shadow-sm data-[state=open]:border-primary/30"
          >
            <AccordionTrigger className="py-5 text-left font-medium text-foreground hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-foreground/70">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionShell>
  );
}
