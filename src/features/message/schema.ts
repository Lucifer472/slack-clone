import { z } from "zod";

export const MessageSchema = z.object({
  body: z.string(),
  image: z.string().optional(),
  channelId: z.number().optional(),
  workspaceId: z.string(),
  parentMessageId: z.number().optional(),
  conversionId: z.number().optional(),
});
