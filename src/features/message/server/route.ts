import { SessionMiddleware } from "@/lib/session";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { MessageSchema } from "../schema";
import { getMemberByUserIdWorkspaceId } from "@/data/members";
import { getChannelById } from "@/data/channels";
import { createMessage } from "@/data/message";

const app = new Hono().post(
  "/",
  SessionMiddleware,
  zValidator("json", MessageSchema),
  async (c) => {
    const user = c.get("user");
    const { body, image, workspaceId, channelId, parentMessageId } =
      c.req.valid("json");

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

    const message = await createMessage({
      body,
      memberId: member.id,
      workspaceId,
      channelId,
      parentMessageId,
      image,
    });

    if (!message) {
      return c.json({ error: "Something went wrong!" });
    }

    return c.json({ success: "Request was success", data: message }, 200);
  }
);

export default app;
