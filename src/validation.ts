import z from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Please use a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const registerSchema = loginSchema.extend({
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
});

export const credentialLoginSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

export type ILogin = z.infer<typeof loginSchema>;
export type IRegister = z.infer<typeof registerSchema>;
export type ICredSignin = z.infer<typeof credentialLoginSchema>;