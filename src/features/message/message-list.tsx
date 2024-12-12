import { Members, Message, User } from "@prisma/client";
import { format, isToday, isYesterday } from "date-fns";
import { MessageText } from "./message-text";

interface MessageReturnType extends Message {
  member: Members & {
    user: User;
  };
  page: {
    reactions: {
      id: number;
      workspaceId: string;
      updatedAt: Date;
      createdAt: Date;
      value: string;
      messageId: number;
      count: number;
      memberIds: number[];
    }[];
    threadCount: number;
    threadImage: string | null | undefined;
    threadTimestamp: number | Date;
  };
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
    data: MessageReturnType[];
    success: string;
  }[];
};

const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);

  if (isToday(date)) {
    return "Today";
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "EEEE, MMMM d");
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
  const data = pages[0].data;

  const groupedMessage = data.reduce((groups, message) => {
    const date = new Date(message.createdAt);

    const dateKey = format(date, "yyyy-MM-dd");

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].unshift(message);

    return groups;
  }, {} as Record<string, typeof data>);

  console.log(groupedMessage);

  return (
    <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto message-scrollbar">
      {Object.entries(groupedMessage || {}).map(([dateKey, message]) => (
        <div key={dateKey}>
          <div className="text-center my-2 relative">
            <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
            <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
              {formatDateLabel(dateKey)}
            </span>
          </div>
          {message.map((msg, index) => (
            <MessageText
              key={index}
              id={msg.id}
              member={msg.member}
              reaction={msg.page.reactions}
              updatedAt={msg.updatedAt}
              createdAt={msg.createdAt}
              threadCount={msg.page.threadCount}
              threadImage={msg.page.threadImage}
              threadTimestamp={msg.page.threadTimestamp}
              isEditing={false}
              setEditingId={() => {}}
              hideThreadButton={false}
              isAuthor={false}
              body={msg.body}
              image={msg.image}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
