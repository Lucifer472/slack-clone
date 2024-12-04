import { db } from "@/lib/db";

export const getWorkspaceById = async ({ id }: { id: string }) => {
  try {
    return await db.workspaces.findUnique({
      where: { id },
    });
  } catch {
    return null;
  }
};
