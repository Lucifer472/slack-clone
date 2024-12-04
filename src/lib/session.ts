"use server";

import { createMiddleware } from "hono/factory";

import { User } from "@prisma/client";
import { auth } from "@/auth";

import { getUserByEmail } from "@/data/user";

type AdditionalContext = {
  Variables: {
    user: User;
  };
};
export const SessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return c.json({ error: "Unauthorized!" }, 403);
    }

    const user = await getUserByEmail({ email: session.user.email });

    if (!user) {
      return c.json({ error: "Unauthorized!" }, 403);
    }

    c.set("user", user);

    await next();
  }
);

export const session = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return null;
  }

  const user = await getUserByEmail({ email: session.user.email });

  return user;
};
