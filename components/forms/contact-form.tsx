"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

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

function getFirstFieldError(errors: Record<string, { message?: string } | undefined>) {
  const first = Object.values(errors).find((error) => error?.message);
  return first?.message;
}

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
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      toast.error(
        "Contact form is not configured. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in Vercel.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Project Inquiry from ${values.name}`,
          from_name: values.name,
          name: values.name,
          email: values.email,
          message: values.projectDetails,
        }),
      });

      let result: { success?: boolean; message?: string } = {};
      try {
        result = (await response.json()) as { success?: boolean; message?: string };
      } catch {
        throw new Error("Unexpected response from email service. Please try again.");
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? labels.error);
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
    const message = getFirstFieldError(form.formState.errors) ?? labels.error;
    toast.error(message);
  };

  const fieldError = (name: keyof ContactValues) => form.formState.errors[name]?.message;

  return (
    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
      <div className="space-y-1.5">
        <Input
          placeholder={labels.namePlaceholder}
          aria-invalid={Boolean(fieldError("name"))}
          className={cn(fieldError("name") && "border-destructive")}
          {...form.register("name")}
          disabled={isSubmitting}
        />
        {fieldError("name") ? (
          <p className="text-xs text-destructive">{fieldError("name")}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <Input
          placeholder={labels.emailPlaceholder}
          type="email"
          aria-invalid={Boolean(fieldError("email"))}
          className={cn(fieldError("email") && "border-destructive")}
          {...form.register("email")}
          disabled={isSubmitting}
        />
        {fieldError("email") ? (
          <p className="text-xs text-destructive">{fieldError("email")}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <Textarea
          placeholder={labels.projectDetailsPlaceholder}
          aria-invalid={Boolean(fieldError("projectDetails"))}
          className={cn(fieldError("projectDetails") && "border-destructive")}
          {...form.register("projectDetails")}
          disabled={isSubmitting}
        />
        {fieldError("projectDetails") ? (
          <p className="text-xs text-destructive">{fieldError("projectDetails")}</p>
        ) : null}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? labels.sending : labels.cta}
      </Button>
    </form>
  );
}
