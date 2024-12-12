"use client";
import { Channels } from "@prisma/client";

import { MessageList } from "./message-list";
import { useGetMessages } from "./api/use-get-messages";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { useSocket } from "@/components/socket-wrapper";

export const Message = ({ channel }: { channel: Channels }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
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

  if (isFetching) {
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pages={data.pages}
      loadMore={fetchNextPage}
      isLoadingMore={isFetchingNextPage}
      canLoadMore={hasNextPage}
    />
  );
};
