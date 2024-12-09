"use client";

import { useEffect } from "react";

import { useChannelModal } from "@/features/channels/hooks/use-create-channel-modal";
import { Members } from "@prisma/client";

export const Workspace = ({ member }: { member: Members }) => {
  const { open, setOpen } = useChannelModal();

  useEffect(() => {
    if (!open && member.role === "ADMIN") {
      setOpen(true);
    }
  }, [open, setOpen, member]);

  if (member.role !== "ADMIN") {
    return;
  }

  return <div></div>;
};
