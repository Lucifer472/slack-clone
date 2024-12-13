export type Message = {
  id: number;
  workspaceId: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
  body: string;
  channelId: number | null;
  memberId: number;
  parentMessageId: number | null;
  conversionId: number | null;
};

export type User = {
  name: string | null;
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  password: string | null;
  emailVerified: string | null;
  image: string | null;
};

export type Members = {
  id: number;
  userId: string;
  workspaceId: string;
  role: "ADMIN" | "MEMBER";
  createdAt: string;
  updatedAt: string;
};

export type reactions = {
  id: number;
  workspaceId: string;
  updatedAt: string;
  createdAt: string;
  value: string;
  messageId: number;
  count: number;
  memberIds: number[];
};

export interface MessageReturnType extends Message {
  member: Members & {
    user: User;
  };
  page: {
    reactions: reactions[];
    threadCount: number;
    threadImage: string | null | undefined;
    threadTimestamp: string | number;
  };
}

export type MessageReturnTypeArray = {
  data: MessageReturnType[];
  success: string;
}[];
