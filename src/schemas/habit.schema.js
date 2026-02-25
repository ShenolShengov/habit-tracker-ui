import z from "zod";

export default function getHabitSchema(t) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t("validation.nameRequired"))
      .max(30, t("validation.nameMax")),
    description: z
      .string()
      .max(2000, t("validation.descriptionMax"))
      .optional(),
  });
}
