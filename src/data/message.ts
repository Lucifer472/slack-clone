import { db } from "@/lib/db";
import { getMemberById } from "./members";
import { getUserById } from "./user";

export const getMessageById = async (id: number) => {
  try {
    return await db.message.findUnique({
      where: { id },
    });
  } catch {
    return null;
  }
};

export const getThreadByParentId = async (parentMessageId: number) => {
  try {
    const data = await db.message.findMany({
      take: 1000,
      where: {
        parentMessageId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (data.length === 0) {
      return {
        count: 0,
        image: undefined,
        timestamp: 0,
      };
    }

    const member = await getMemberById(data[0].memberId);

    if (!member) {
      return {
        count: 0,
        image: undefined,
        timestamp: 0,
      };
    }

    const user = await getUserById({ id: member.userId });

    return {
      count: data.length,
      image: user!.image,
      timestamp: data[0].updatedAt,
    };
  } catch {
    return {
      count: 0,
      image: undefined,
      timestamp: 0,
    };
  }
};

export const createMessage = async ({
  body,
  channelId,
  image,
  memberId,
  parentMessageId,
  workspaceId,
  conversionId,
}: {
  body: string;
  channelId?: number;
  image?: string;
  memberId: number;
  parentMessageId?: number;
  workspaceId: string;
  conversionId?: number;
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
        conversionId,
      },
    });
  } catch {
    return null;
  }
};
