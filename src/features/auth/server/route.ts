import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import bcrypt from "bcryptjs";

import { signIn, signOut } from "@/auth";
import { getUserByEmail } from "@/data/user";

import { db } from "@/lib/db";
import { SessionMiddleware } from "@/lib/session";
import { ImageUpdateSchema } from "../schema";

const app = new Hono()
  .post(
    "/login",
    zValidator(
      "json",
      z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        type: z.enum(["github", "credentials"]),
      })
    ),
    async (c) => {
      const { email, password, type } = c.req.valid("json");

      try {
        if (type == "github") {
          // await signIn("github", { redirect: false });
          return c.json({ success: "Request was ok" }, 200);
        }

        const user = await getUserByEmail({ email });
        if (!user) {
          return c.json({ error: "No user found!" }, 404);
        }

        if (!user.password) {
          return c.json({ error: "Wrong Auth Method" }, 403);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return c.json({ error: "Wrong Password" }, 403);

        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        return c.json({ success: "Request was ok" }, 200);
      } catch (error) {
        return c.json({ error: error }, 500);
      }
    }
  )
  .post(
    "/register",
    zValidator(
      "json",
      z.object({
        fname: z.string().min(3),
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      })
    ),
    async (c) => {
      const { email, password, fname } = c.req.valid("json");

      try {
        const user = await getUserByEmail({ email });
        if (user) {
          return c.json({ error: "User Already Exists!" }, 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.create({
          data: {
            name: fname,
            email,
            password: hashedPassword,
          },
        });

        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        return c.json({ success: "Request was ok" }, 200);
      } catch (error) {
        return c.json({ error: error }, 500);
      }
    }
  )
  .get("/logout", SessionMiddleware, async (c) => {
    try {
      await signOut();
      return c.json({ success: "request was ok" }, 200);
    } catch (error) {
      return c.json({ error }, 500);
    }
  })
  .get("/user", SessionMiddleware, async (c) => {
    const user = c.get("user");
    const data = { ...user, password: null };
    return c.json({ success: "Request was success", user: data }, 200);
  })
  .patch(
    "/update",
    SessionMiddleware,
    zValidator("json", ImageUpdateSchema),
    async (c) => {
      const { image } = c.req.valid("json");
      const user = c.get("user");

      try {
        await db.user.update({
          where: { id: user.id },
          data: {
            image,
          },
        });

        return c.json({ success: "Profile Updated!" }, 200);
      } catch (error) {
        return c.json({ error }, 500);
      }
    }
  );

export default app;
