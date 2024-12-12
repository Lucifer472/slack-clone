import { Members, Message, Reaction, User } from "@prisma/client";

interface MessageReturnType extends Message {
  member: Members & {
    user: User;
  };
  reaction: Reaction;
  thread:
    | (Message &
        {
          member: Members & {
            user: User;
          };
          reaction: Reaction;
        }[])
    | null;
}

type MessageListProps = {
  channelName?: string;
  channelCreationTime?: Date;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
  variant?: "channel" | "thread" | "conversation";
  memberName?: string;
  pages: {
    data: MessageReturnType[] | [];
    success: string;
  }[];
};

export const MessageList = ({
  canLoadMore,
  channelCreationTime,
  channelName,
  pages,
  isLoadingMore,
  loadMore,
  variant = "channel",
  memberName,
}: MessageListProps) => {
  return (
    <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto message-scrollbar ">
      Message List
    </div>
  );
};
