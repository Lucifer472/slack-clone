"use client";

import { useParams } from "next/navigation";

export const useChannelId = () => {
  const params = useParams<{ channel: string }>();
  return parseInt(params.channel);
};
