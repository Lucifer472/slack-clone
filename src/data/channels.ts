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

export const getChannelById = async (id: number) => {
  try {
    return await db.channels.findUnique({
      where: { id },
    });
  } catch {
    return null;
  }
};
