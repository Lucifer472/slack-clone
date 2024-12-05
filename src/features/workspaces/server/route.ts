import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/lib/db";
import { SessionMiddleware } from "@/lib/session";
import { makeCode } from "@/lib/utils";

import { CreateWorkspaceSchema } from "../schema";
import { getWorkspaceById } from "@/data/workspace";
import {
  getMembersByUserId,
  getMembersByUserIdWorkspaceId,
} from "@/data/members";

const app = new Hono()
  .get("/", SessionMiddleware, async (c) => {
    const user = c.get("user");

    const members = await getMembersByUserId({ userId: user.id });

    if (!members) {
      return c.json({ success: "request was success", data: [] }, 200);
    }

    const workspaceIds = members.map((m) => m.workspaceId);

    const workspaces = [];

    try {
      for (const workspaceId of workspaceIds) {
        const workspace = await db.workspaces.findUnique({
          where: { id: workspaceId },
        });

        if (workspace) {
          workspaces.push(workspace);
        }
      }

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
  .get("/:workspaceId/members", SessionMiddleware, async (c) => {
    const user = c.get("user");
    const { workspaceId } = c.req.param();

    const members = await getMembersByUserIdWorkspaceId({
      workspaceId,
      userId: user.id,
    });

    if (!members) {
      return c.json({ error: "No Workspace Found!" }, 404);
    }

    return c.json({ success: "request was success", data: members }, 200);
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

        await db.members.create({
          data: {
            userId: user.id,
            workspaceId: workspace.id,
            role: "ADMIN",
          },
        });

        return c.json({ success: "workspace created", data: workspace }, 200);
      } catch (error) {
        return c.json({ error }, 500);
      }
    }
  )
  .patch(
    "/:workspaceId",
    SessionMiddleware,
    zValidator("json", CreateWorkspaceSchema),
    async (c) => {
      const user = c.get("user");
      const { workspaceId } = c.req.param();
      const { name } = c.req.valid("json");

      const workspace = getWorkspaceById({ id: workspaceId });

      if (!workspace) {
        return c.json({ error: "No workspace Found!" }, 404);
      }

      const member = await getMembersByUserIdWorkspaceId({
        userId: user.id,
        workspaceId,
      });

      if (!member || member.role !== "ADMIN") {
        return c.json({ error: "You are not a Authorized!" }, 403);
      }

      try {
        const updatedWorkspace = await db.workspaces.update({
          where: {
            id: workspaceId,
          },
          data: {
            name,
          },
        });

        return c.json(
          { success: "Request was successful", data: updatedWorkspace },
          200
        );
      } catch (error) {
        return c.json({ error }, 500);
      }
    }
  )
  .delete("/:workspaceId", SessionMiddleware, async (c) => {
    const user = c.get("user");
    const { workspaceId } = c.req.param();

    const workspace = getWorkspaceById({ id: workspaceId });

    if (!workspace) {
      return c.json({ error: "No workspace Found!" }, 404);
    }

    const member = await getMembersByUserIdWorkspaceId({
      userId: user.id,
      workspaceId,
    });

    if (!member || member.role !== "ADMIN") {
      return c.json({ error: "You are not a Authorized!" }, 403);
    }

    try {
      await db.workspaces.delete({
        where: {
          id: workspaceId,
        },
      });

      return c.json({ success: "Request was successful" }, 200);
    } catch (error) {
      return c.json({ error }, 500);
    }
  });

export default app;
