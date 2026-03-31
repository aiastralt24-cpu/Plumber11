import { z } from "zod";

export const leadSubmissionSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  mobile: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit mobile number."),
  citySlug: z.string().min(2),
  area: z.string().min(2, "Add an area or pincode."),
  serviceSlug: z.string().min(2),
  urgency: z.enum(["urgent", "week", "planned"]),
  photoUrl: z.string().url().optional().or(z.literal("")),
  sourcePage: z.string().min(1),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  sourceChannel: z.enum(["call", "whatsapp", "form", "callback"])
});

export const callbackSchema = z.object({
  mobile: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit mobile number."),
  citySlug: z.string().min(2),
  sourcePage: z.string().min(1)
});
