import * as z from "zod";

export const SignInSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .email({ message: "Invalid email address" })
      .min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
