import { db } from "@/lib/db";

export const getMembersByUserId = async ({ userId }: { userId: string }) => {
  try {
    return await db.members.findMany({
      where: {
        userId,
      },
      take: 1000,
    });
  } catch {
    return null;
  }
};

export const getMembersByUserIdWorkspaceId = async ({
  userId,
  workspaceId,
}: {
  userId: string;
  workspaceId: string;
}) => {
  try {
    return await db.members.findUnique({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId,
        },
      },
    });
  } catch {
    return null;
  }
};
