import { db } from "@/lib/db";

export const getUserByEmail = async ({ email }: { email: string }) => {
  try {
    return await db.user.findUnique({
      where: { email },
    });
  } catch {
    return null;
  }
};
