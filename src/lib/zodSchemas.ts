import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z
    .enum([
      "inspection",
      "compliance",
      "consultancy",
      "port-support",
      "trade-facilitation",
      "other",
      "", // Allow empty string for initial state
    ])
    .optional(),
  subject: z.string().min(4, "Subject must be at least 10 characters long"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
