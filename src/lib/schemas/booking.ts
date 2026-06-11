import { z } from "zod";

const addonSchema = z.object({
  id: z.string(),
  label: z.string(),
  price: z.number().nonnegative(),
});

const bookingVehicleSchema = z.object({
  id: z.string().trim().optional(),
  plate: z.string().trim().min(2),
  registrationNumber: z.string().trim().min(2),
  vehicleName: z.string().trim().min(1),
  vehicleYear: z.number().nullable().optional().default(null),
  vehicleType: z.string().trim().optional().default(""),
  category: z.string().trim().min(1),
  packageId: z.string().trim().min(1),
  packageLabel: z.string().trim().optional().default(""),
  addonIds: z.array(z.string().trim().min(1)).optional().default([]),
  addons: z.array(addonSchema).optional().default([]),
  discountPercent: z.number().min(0).max(100).optional().default(0),
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
    idempotencyKey: z.string().trim().min(8).max(120).optional(),
    discountDkk: z.number().nonnegative().optional().default(0),
    secondCarPlate: z.string().trim().optional().default(""),
    couponCode: z.string().trim().optional().default(""),
    vehicles: z.array(bookingVehicleSchema).min(1).max(2).optional(),
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

    if (value.vehicles && value.vehicles.length > 2) {
      ctx.addIssue({
        code: "custom",
        path: ["vehicles"],
        message: "Du kan maksimalt booke to biler ad gangen.",
      });
    }
  });
