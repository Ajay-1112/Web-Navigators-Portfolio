import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

type WhatsAppFloatProps = {
  number: string;
  label: string;
};

export function WhatsAppFloat({ number, label }: WhatsAppFloatProps) {
  return (
    <Button
      asChild
      className="fixed bottom-6 right-4 z-50 h-12 rounded-full px-4 shadow-xl md:right-20"
    >
      <Link
        href={`https://wa.me/${number}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Open WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}
