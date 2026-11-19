import { z } from "zod";
import { LIMITS } from "./calculator";

const consent = z.literal(true, {
  errorMap: () => ({ message: "Please tick the box to agree before sending." }),
});

/** Fields shared by every form: honeypot + Turnstile token + consent. */
const base = {
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  consent,
  /** Honeypot. Real people never see or fill this. */
  company_website: z.string().max(0, "Spam check failed.").optional().or(z.literal("")),
  turnstileToken: z.string().max(4096).optional(),
};

export const auditSchema = z.object({
  type: z.literal("audit"),
  ...base,
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+()\s-]*$/, "Please enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  venue: z.string().trim().min(2, "Please enter your venue name.").max(150),
  venues: z.string().max(20).optional().or(z.literal("")),
  message: z.string().trim().max(2000, "Please keep it under 2,000 characters.").optional().or(z.literal("")),
});

export const healthCheckSchema = z.object({
  type: z.literal("health-check"),
  ...base,
  venue: z.string().trim().min(2, "Please enter your venue name.").max(150),
  listSize: z.string().min(1, "Please choose a list size.").max(50),
  tools: z.string().trim().min(2, "Tell us which tools you use (or 'none').").max(300),
  lastSend: z.string().min(1, "Please choose when you last sent.").max(50),
});

const num = (key: keyof typeof LIMITS) => z.coerce.number().min(LIMITS[key].min).max(LIMITS[key].max);

export const calculatorInputsSchema = z.object({
  venues: num("venues"),
  guests: num("guests"),
  lapsedSharePct: num("lapsedSharePct"),
  avgSpend: num("avgSpend"),
  winBackRatePct: num("winBackRatePct"),
  visitsPerGuest: num("visitsPerGuest"),
  marginPct: num("marginPct"),
  monthlyFee: num("monthlyFee"),
});

export const calculatorLeadSchema = z.object({
  type: z.literal("calculator"),
  ...base,
  venue: z.string().trim().min(2, "Please enter your venue name.").max(150),
  inputs: calculatorInputsSchema,
});

export const testimonialSchema = z.object({
  type: z.literal("testimonial"),
  ...base,
  role: z.string().trim().min(2, "Please enter your role.").max(100),
  venue: z.string().trim().min(2, "Please enter your venue name.").max(150),
  quote: z.string().trim().min(20, "Please write at least a sentence or two.").max(1500),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  permission: z.literal(true, {
    errorMap: () => ({ message: "We need your permission to publish." }),
  }),
});

export const leadSchema = z.discriminatedUnion("type", [
  auditSchema,
  healthCheckSchema,
  calculatorLeadSchema,
  testimonialSchema,
]);

export type AuditInput = z.infer<typeof auditSchema>;
export type HealthCheckInput = z.infer<typeof healthCheckSchema>;
export type CalculatorLeadInput = z.infer<typeof calculatorLeadSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
