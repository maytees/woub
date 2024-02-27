import { TRPCError } from "@trpc/server";
import { registerSchema } from "../../validation";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
import { createTRPCRouter, publicProcedure } from "./trpc";

export const authRouter = createTRPCRouter({
    register: publicProcedure
        .input(registerSchema)
        .mutation(async ({ input, ctx }) => {

            const { username, email, password } = input;

            const exists = await ctx.db.user.findFirst({
                where: { email }
            });

            if (exists) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "User already exists"
                });
            }


            const salt = bcrypt.genSaltSync(SALT_ROUNDS);
            const hash = bcrypt.hashSync(password, salt);

            const result = await ctx.db.user.create({
                data: {
                    name: username,
                    email,
                    password: hash
                }
            });

            return {
                status: 201,
                message: "Account created successfully",
                result: result.email
            }
        })
})