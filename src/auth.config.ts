import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "./features/auth/schema";
import { getUserByEmail } from "./data/user";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          throw new Error("Invalid Fields");
        }

        const { email, password } = validatedFields.data;

        const user = await getUserByEmail({ email });

        if (!user || !user.password) {
          throw new Error("No User Found!");
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw new Error("Invalid Password");

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
