"use client";
import { useEffect } from "react";
import { LoaderIcon } from "lucide-react";
import { Channels } from "@prisma/client";

import { useSocket } from "@/components/socket-wrapper";

import { MessageList } from "./message-list";
import { useGetMessages } from "./api/use-get-messages";

export const Message = ({ channel }: { channel: Channels }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
  } = useGetMessages({
    queryParams: { channelId: channel.id },
  });

  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!!socket && isConnected) {
      socket.on("receive_message_channel", () => {
        refetch();
      });
    }
  }, [isConnected, socket, refetch]);

  if (isPending) {
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-5 text-muted-foreground" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full flex-1 flex items-center justify-center"></div>
    );
  }

  return (
    <MessageList
      channelName={channel.name}
      channelCreationTime={channel.createdAt}
      data={data.pages}
      loadMore={fetchNextPage}
      isLoadingMore={isFetchingNextPage}
      canLoadMore={hasNextPage}
    />
  );
};
