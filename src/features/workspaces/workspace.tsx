"use client";

import { useEffect } from "react";
import { Members } from "@prisma/client";
import { TriangleAlertIcon } from "lucide-react";

import { useChannelModal } from "@/features/channels/hooks/use-create-channel-modal";

export const Workspace = ({ member }: { member: Members }) => {
  const { open, setOpen } = useChannelModal();

  useEffect(() => {
    if (!open && member.role === "ADMIN") {
      setOpen(true);
    }
  }, [open, setOpen, member]);

  if (member.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex-1 flex items-center justify-center flex-col gap-2">
        <TriangleAlertIcon className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace not found!
        </span>
      </div>
    );
  }

  return <div></div>;
};
