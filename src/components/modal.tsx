"use client";

import { useEffect, useState } from "react";
import { CreateWorkspaceModal } from "@/features/workspaces/create-workspace-modal";
import { CreateChannelModal } from "@/features/channels/create-channel-moda";

export const Modals = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return;

  return (
    <>
      <CreateWorkspaceModal />
      <CreateChannelModal />
    </>
  );
};
