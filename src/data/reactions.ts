import { db } from "@/lib/db";

export const getReactionsByMessageId = async (messageId: number) => {
  try {
    return await db.reaction.findMany({
      take: 1000,
      where: {
        messageId,
      },
    });
  } catch {
    return null;
  }
};
