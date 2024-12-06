"use client";

import { useParams } from "next/navigation";
import { AlertTriangleIcon, Loader } from "lucide-react";

import { useGetMembersByUserIdWorkspaceId } from "@/features/workspaces/api/use-get-members";
import { useGetWorkspaceById } from "@/features/workspaces/api/use-get-workspace-by-id";

import { WorkspaceHeader } from "./workspace-header";

export const WorkspaceSidebar = () => {
  const params = useParams<{ id: string }>();
  const workspaceId = params.id;

  const { data: workspace, isPending: workspacePending } =
    useGetWorkspaceById(workspaceId);

  const { data: members, isPending: membersPending } =
    useGetMembersByUserIdWorkspaceId({ param: { workspaceId } });

  if (workspacePending || membersPending) {
    return (
      <div className="flex flex-col bg-[#5c2c5f] h-full items-center justify-center">
        <Loader className="animate-spin text-white" />
      </div>
    );
  }

  if (!members || !workspace) {
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
        isAdmin={members.data.role === "ADMIN"}
        workspace={workspace.data}
      />
    </div>
  );
};
