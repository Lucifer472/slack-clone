import { db } from "@/lib/db";

export const createMessage = async ({
  body,
  channelId,
  image,
  memberId,
  parentMessageId,
  workspaceId,
}: {
  body: string;
  channelId?: number;
  image?: string;
  memberId: number;
  parentMessageId?: number;
  workspaceId: string;
}) => {
  try {
    return await db.message.create({
      data: {
        body,
        channelId,
        image,
        memberId,
        parentMessageId,
        workspaceId,
      },
    });
  } catch {
    return null;
  }
};
