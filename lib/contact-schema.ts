import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  projectDetails: z
    .string()
    .trim()
    .min(5, "Project details must be at least 5 characters."),
});

export type ContactValues = z.infer<typeof contactSchema>;
