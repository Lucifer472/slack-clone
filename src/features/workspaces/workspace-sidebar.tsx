"use client";

import {
  AlertTriangleIcon,
  HashIcon,
  Loader,
  MessageSquareTextIcon,
  SendHorizonalIcon,
} from "lucide-react";

import { useGetMemberByUserIdWorkspaceId } from "@/features/workspaces/api/use-get-member";
import { useGetWorkspaceById } from "@/features/workspaces/api/use-get-workspace-by-id";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useChannelModal } from "@/features/channels/hooks/use-create-channel-modal";
import { useGetMembersByWorkspaceId } from "@/features/workspaces/api/use-get-members";

import { useWorkspaceId } from "./hooks/use-workspace-id";
import { useChannelId } from "../channels/hooks/use-channel-id";

import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceSection } from "./workspace-section";
import { SidebarItem } from "./sidebar-item";
import { UserItem } from "./user-item";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const { setOpen: setChannelOpen } = useChannelModal();

  const { data: workspace, isPending: isWorkspace } =
    useGetWorkspaceById(workspaceId);

  const { data: member, isPending: isMember } =
    useGetMemberByUserIdWorkspaceId(workspaceId);

  const { data: channels, isPending: isChannels } = useGetChannels(workspaceId);

  const { data: members, isPending: isMembers } =
    useGetMembersByWorkspaceId(workspaceId);

  if (isWorkspace || isMember || isChannels || isMembers) {
    return (
      <div className="flex flex-col bg-[#5c2c5f] h-full items-center justify-center">
        <Loader className="animate-spin text-white" />
      </div>
    );
  }

  if (!member || !workspace) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5c2c5f] h-full items-center justify-center">
        <AlertTriangleIcon className="text-white" />
        <span className="text-white text-sm">Workspace Not found!</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5c2c5f] h-full">
      <WorkspaceHeader
        isAdmin={member.data.role === "ADMIN"}
        workspace={workspace.data}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Treads" icon={MessageSquareTextIcon} id="threads" />
        <SidebarItem
          label="Drafts & Sent"
          icon={SendHorizonalIcon}
          id="drafts"
        />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New Channel"
        onNew={
          member.data.role === "ADMIN"
            ? () => {
                setChannelOpen(true);
              }
            : undefined
        }
      >
        {channels &&
          channels.data.map((c) => (
            <SidebarItem
              icon={HashIcon}
              label={c.name}
              id={c.id.toString()}
              key={c.id}
              variant={channelId === c.id ? "active" : "default"}
            />
          ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Message"
        hint="New Direct Message"
        onNew={() => {}}
      >
        {members &&
          members.data.map((m) => (
            <UserItem
              id={m.user.id}
              key={m.id}
              image={m.user.image ? m.user.image : undefined}
            />
          ))}
      </WorkspaceSection>
    </div>
  );
};
