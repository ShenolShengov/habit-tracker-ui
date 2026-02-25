import z from "zod";

export default function getProfileSchema(t) {
  return z.object({
    email: z.email({ error: t("validation.invalidEmail") }),
    firstName: z
      .string()
      .max(50, t("validation.firstNameMax"))
      .optional()
      .or(z.literal("")),
    lastName: z
      .string()
      .max(50, t("validation.lastNameMax"))
      .optional()
      .or(z.literal("")),
    age: z.coerce
      .number()
      .int()
      .min(1, t("validation.ageMin"))
      .max(150, t("validation.ageMax"))
      .optional()
      .or(z.literal("")),
    timeZone: z.string().min(1, t("validation.timeZoneRequired")),
  });
}
