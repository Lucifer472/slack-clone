import { db } from "@/lib/db";

export const getChannelsByWorkspaceId = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    return await db.channels.findMany({
      take: 1000,
      where: {
        workspaceId,
      },
    });
  } catch {
    return null;
  }
};
