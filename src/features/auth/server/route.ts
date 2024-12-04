import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";

const app = new Hono().post(
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
      if (type === "github") {
        await signIn("github", { redirect: false });
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
);

export default app;
