import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, {message: 'Too short'}),
  username: z.string().min(2, {message: 'Too short'}).max(50),
  email: z.string().email(),
  password: z.string().min(8, {message: 'Password must be at least 8 characters'}),
  confirmPassword: z.string().min(8, {message: 'Password must be at least 8 characters'})
}).superRefine((val, ctx) => {
  if (val.password !== val.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match"
    });
  }
})
export const SigninValidation = z.object({
  username: z.string().min(2, {message: 'Too short'}).max(50),
  password: z.string().min(8, {message: 'Password must be at least 8 characters'}),
})

