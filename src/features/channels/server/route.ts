import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { SessionMiddleware } from "@/lib/session";

import { getMembersByUserIdWorkspaceId } from "@/data/members";
import { getChannelsByWorkspaceId } from "@/data/channels";
import { getWorkspaceById } from "@/data/workspace";

import { CreateWorkspaceSchema } from "@/features/workspaces/schema";
import { db } from "@/lib/db";

const app = new Hono()
  .get("/:workspaceId", SessionMiddleware, async (c) => {
    const { workspaceId } = c.req.param();
    const user = c.get("user");

    const workspace = await getWorkspaceById({ id: workspaceId });

    if (!workspace) {
      return c.json({ error: "No Workspace Found!" }, 404);
    }

    const member = await getMembersByUserIdWorkspaceId({
      userId: user.id,
      workspaceId,
    });

    if (!member) {
      return c.json({ error: "You are not a Authorized!" }, 403);
    }

    const channels = await getChannelsByWorkspaceId({ workspaceId });

    if (!channels) {
      return c.json({ error: "Something went wrong!" }, 500);
    }

    return c.json({ success: "request was success!", data: channels }, 200);
  })
  .post(
    "/:workspaceId",
    zValidator("json", CreateWorkspaceSchema),
    SessionMiddleware,
    async (c) => {
      const { workspaceId } = c.req.param();
      const user = c.get("user");

      const { name } = c.req.valid("json");

      const workspace = await getWorkspaceById({ id: workspaceId });

      if (!workspace) {
        return c.json({ error: "No Workspace Found!" }, 404);
      }

      const member = await getMembersByUserIdWorkspaceId({
        userId: user.id,
        workspaceId,
      });

      if (!member || member.role !== "ADMIN") {
        return c.json({ error: "You are not a Authorized!" }, 403);
      }

      const data = await db.channels.create({
        data: {
          name,
          workspaceId,
        },
      });

      return c.json({ success: "request was success!", data }, 200);
    }
  );

export default app;
