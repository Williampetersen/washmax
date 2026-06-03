import { z } from "zod";

const addonSchema = z.object({
  id: z.string(),
  label: z.string(),
  price: z.number().nonnegative(),
});

export const bookingCustomerSchema = z.object({
  firstName: z.string().trim().min(1, "Indtast fornavn."),
  lastName: z.string().trim().min(1, "Indtast efternavn."),
  email: z.string().trim().email("Indtast en gyldig emailadresse."),
  phone: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, "").length >= 8, "Indtast et gyldigt telefonnummer."),
  address: z.string().trim().min(1, "Indtast adresse."),
  postalCode: z.string().trim().min(1, "Indtast postnummer."),
  city: z.string().trim().min(1, "Indtast by."),
  notes: z.string().trim().optional().default(""),
  customerType: z.enum(["private", "business"]).default("private"),
  company: z.string().trim().optional().default(""),
  companyId: z.string().trim().optional().default(""),
  wantsMarketing: z.boolean().default(false),
  acceptsTerms: z.boolean().refine((value) => value, {
    message: "Du skal acceptere handelsbetingelserne og persondatapolitikken.",
  }),
});

export const bookingRequestSchema = z
  .object({
    plate: z.string().trim().min(2),
    registrationNumber: z.string().trim().min(2),
    vehicleName: z.string().trim().min(1),
    vehicleYear: z.number().nullable(),
    vehicleType: z.string().trim().default(""),
    category: z.string().trim().min(1),
    packageId: z.string().trim().min(1),
    packageLabel: z.string().trim().min(1),
    addons: z.array(addonSchema).default([]),
    subtotal: z.number().nonnegative(),
    total: z.number().nonnegative(),
    appointmentDate: z.string().trim().min(1),
    appointmentTime: z.string().trim().min(1),
    customer: bookingCustomerSchema,
  })
  .superRefine((value, ctx) => {
    if (value.customer.customerType === "business" && !value.customer.company.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["customer", "company"],
        message: "Indtast firmanavn for erhvervsbookingen.",
      });
    }
  });
