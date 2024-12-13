"use client";
import { useState } from "react";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import { MessageReturnType } from "@/types";

import { MessageText } from "./message-text";
import { ChannelHero } from "./channel-hero";

import { useCurrent } from "../auth/api/use-current";

type MessageListProps = {
  channelName?: string;
  channelCreationTime?: Date;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
  variant?: "channel" | "thread" | "conversation";
  memberName?: string;
  data: {
    success: string;
    nextPage: number | undefined;
    data: MessageReturnType[];
  }[];
};

const TIME_THRESHOLD = 5;

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
  data,
  isLoadingMore,
  loadMore,
  variant = "channel",
  memberName,
}: MessageListProps) => {
  const [editingId, setEditingId] = useState<null | number>(null);

  const { data: currentUser } = useCurrent();
  const mergedMessage = data.flatMap((d) => d.data);

  const groupedMessage = mergedMessage.reduce((groups, message) => {
    const date = new Date(message.createdAt);

    const dateKey = format(date, "yyyy-MM-dd");

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].unshift(message);

    return groups;
  }, {} as Record<string, typeof mergedMessage>);

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
          {message.map((msg, index) => {
            const prev = message[index - 1];
            const isCompact =
              prev &&
              prev.memberId === msg.memberId &&
              differenceInMinutes(
                new Date(msg.createdAt),
                new Date(prev.createdAt)
              ) < TIME_THRESHOLD;

            return (
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
                isEditing={editingId === msg.id}
                setEditingId={setEditingId}
                hideThreadButton={variant === "thread"}
                isAuthor={msg.member.userId === currentUser?.id}
                body={msg.body}
                image={msg.image}
                isCompact={isCompact}
              />
            );
          })}
        </div>
      ))}
      {variant === "channel" && channelName && channelCreationTime && (
        <ChannelHero createdAt={channelCreationTime} name={channelName} />
      )}
    </div>
  );
};
