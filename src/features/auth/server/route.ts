import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  return c.json({ success: "Request was ok" }, 200);
});

export default app;
