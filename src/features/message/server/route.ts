import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { SessionMiddleware } from "@/lib/session";
import { db } from "@/lib/db";
import { MessageSchema } from "../schema";

import { getMemberByUserIdWorkspaceId } from "@/data/members";
import { getChannelById } from "@/data/channels";
import { createMessage, getMessageById } from "@/data/message";

const app = new Hono()
  .post(
    "/",
    SessionMiddleware,
    zValidator("json", MessageSchema),
    async (c) => {
      const user = c.get("user");
      const {
        body,
        image,
        workspaceId,
        channelId,
        parentMessageId,
        conversionId,
      } = c.req.valid("json");

      let _conversionId = conversionId;

      const member = await getMemberByUserIdWorkspaceId({
        userId: user.id,
        workspaceId,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 403);
      }

      if (channelId) {
        const channel = await getChannelById(channelId);

        if (!channel || channel.workspaceId !== workspaceId) {
          return c.json({ error: "Unauthorized" }, 403);
        }
      }

      if (conversionId && !channelId && parentMessageId) {
        const parentMessage = await getMessageById(parentMessageId);

        if (!parentMessage) {
          return c.json({ error: "Parent Id Incorrect!" }, 404);
        }

        _conversionId = parentMessage.conversionId
          ? parentMessage.conversionId
          : undefined;
      }

      const message = await createMessage({
        body,
        memberId: member.id,
        workspaceId,
        channelId,
        parentMessageId,
        image,
        conversionId: _conversionId,
      });

      if (!message) {
        return c.json({ error: "Something went wrong!" });
      }

      return c.json({ success: "Request was success", data: message }, 200);
    }
  )
  .get("/", SessionMiddleware, async (c) => {
    const { channelId, conversionId, parentMessageId, page } = c.req.query();

    let _conversionId: string | undefined = conversionId;

    if (!conversionId && !channelId && parentMessageId) {
      const parentMessage = await getMessageById(parseInt(parentMessageId));

      if (!parentMessage) {
        return c.json({ error: "Parent Message Id Invalid" }, 404);
      }

      _conversionId = parentMessage.conversionId
        ? parentMessage.conversionId.toString()
        : undefined;
    }

    const results = await db.message.findMany({
      take: 100,
      skip: (parseInt(page) - 1) * 100,
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        AND: [
          {
            channelId: parseInt(channelId),
          },
          {
            parentMessageId: parseInt(parentMessageId),
          },
          {
            conversionId: _conversionId ? parseInt(_conversionId) : undefined,
          },
        ],
      },
    });

    return c.json({ success: "Request was success", data: results }, 200);
  });

export default app;
