import { z } from "zod";

export const signupSchema = z.object({
  username: z.string({ required_error: "Username is required" })
    .min(3, "Username must be at least 3 characters long"),

  email: z.string({ required_error: "Email is required" })
    .email("Invalid email address"),

  password: z.string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long")
});

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .email("Invalid email address"),

  password: z.string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long")
});