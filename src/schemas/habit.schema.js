import z from "zod";

const habitSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(30, "Name must be between 1 and 30 symbols"),
  description: z
    .string()
    .max(2000, "Description must be between 1 and 2000 symbols")
    .optional(),
});

export default habitSchema;
