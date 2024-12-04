import { Hono } from "hono";
import { handle } from "hono/vercel";

import authRoute from "@/features/auth/server/route";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/auth-route", authRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);

export type AppType = typeof routes;
