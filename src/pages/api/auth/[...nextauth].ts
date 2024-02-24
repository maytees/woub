import NextAuth from "next-auth";

import { authOptions } from "~/server/auth";

export const authOptionss = { ...authOptions };
export default NextAuth(authOptions);
