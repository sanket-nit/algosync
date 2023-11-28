import * as z from "zod";

export const SignupValidation = z
  .object({
    username: z.string().min(2, { message: "Too short" }).max(50),
    email: z.string().email(),
    password: z
      .string()
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number")
      .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character")
      .min(8, "Must be at least 8 characters in length"),
    confirm: z.string(),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export const SigninValidation = z.object({
  username: z.string().min(2, { message: "Too short" }).max(50),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});
