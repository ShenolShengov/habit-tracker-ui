import z from "zod";

const profileSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  firstName: z
    .string()
    .max(50, "First name must be at most 50 characters")
    .optional()
    .or(z.literal("")),
  lastName: z
    .string()
    .max(50, "Last name must be at most 50 characters")
    .optional()
    .or(z.literal("")),
  age: z.coerce
    .number()
    .int()
    .min(1, "Age must be at least 1")
    .max(150, "Age must be at most 150")
    .optional()
    .or(z.literal("")),
  timeZone: z.string().min(1, "Time zone is required"),
});

export default profileSchema;
