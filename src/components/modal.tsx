"use client";

import { useEffect, useState } from "react";
import { CreateWorkspaceModal } from "@/features/workspaces/create-workspace-modal";

export const Modals = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return;

  return (
    <>
      <CreateWorkspaceModal />
    </>
  );
};
