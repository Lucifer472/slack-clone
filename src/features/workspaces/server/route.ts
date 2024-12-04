import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/lib/db";
import { SessionMiddleware } from "@/lib/session";
import { makeCode } from "@/lib/utils";

import { CreateWorkspaceSchema } from "../schema";
import { getWorkspaceById } from "@/data/workspace";

const app = new Hono()
  .get("/", SessionMiddleware, async (c) => {
    const user = c.get("user");

    try {
      const workspaces = await db.workspaces.findMany({
        where: { userId: user.id },
        take: 1000,
      });

      return c.json({ success: "request was success", data: workspaces }, 200);
    } catch (error) {
      return c.json({ error }, 500);
    }
  })
  .get("/:workspaceId", SessionMiddleware, async (c) => {
    const user = c.get("user");
    const { workspaceId } = c.req.param();

    const workspace = await getWorkspaceById({ id: workspaceId });

    if (!workspace) {
      return c.json({ error: "No Workspace Found!" }, 404);
    }

    if (workspace.userId !== user.id) {
      return c.json(
        { error: "You don't have permission to access this workspace!" },
        400
      );
    }

    return c.json({ success: "request was success", data: workspace }, 200);
  })
  .post(
    "/create",
    SessionMiddleware,
    zValidator("json", CreateWorkspaceSchema),
    async (c) => {
      const user = c.get("user");
      const { name } = c.req.valid("json");

      try {
        const workspace = await db.workspaces.create({
          data: {
            name,
            joinCode: makeCode(6),
            userId: user.id,
          },
        });

        return c.json({ success: "workspace created", data: workspace }, 200);
      } catch (error) {
        return c.json({ error }, 500);
      }
    }
  );

export default app;
