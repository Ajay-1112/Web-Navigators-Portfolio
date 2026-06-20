"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  projectDetails: z.string().min(10),
});

type ContactValues = z.infer<typeof contactSchema>;

type ContactFormProps = {
  labels: {
    cta: string;
    success: string;
    error: string;
    sending: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    projectDetailsPlaceholder: string;
  };
};

export function ContactForm({ labels }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      projectDetails: "",
    },
  });

  const onSubmit = async (values: ContactValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? labels.error);
      }

      toast.success(labels.success);
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : labels.error;
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = () => {
    toast.error(labels.error);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, onError)}
      className="space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm"
    >
      <div>
        <Input placeholder={labels.namePlaceholder} {...form.register("name")} disabled={isSubmitting} />
      </div>
      <div>
        <Input
          placeholder={labels.emailPlaceholder}
          type="email"
          {...form.register("email")}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <Textarea
          placeholder={labels.projectDetailsPlaceholder}
          {...form.register("projectDetails")}
          disabled={isSubmitting}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? labels.sending : labels.cta}
      </Button>
    </form>
  );
}
