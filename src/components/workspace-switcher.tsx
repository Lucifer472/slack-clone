"use client";
import { Loader, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

import { useGetWorkspaceById } from "@/features/workspaces/api/use-get-workspace-by-id";
import { useWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const WorkspaceSwitcher = () => {
  const { setOpen } = useWorkspaceModal();

  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const { data: workspaces } = useGetWorkspaces();
  const { data, isPending } = useGetWorkspaceById(workspaceId);

  if (isPending || !data || !data.data || !workspaces) {
    return <Loader className="animate-spin text-white" />;
  }

  const workspace = data.data;

  const filteredWorkspaces = workspaces.data.filter(
    (work) => work.id !== workspace.id
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 overflow-hidden bg-[#adadad] hover:bg-[#adadad]/80 text-slate-800 font-semibold text-xl">
          {workspace.name.charAt(0).toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          onClick={() => {
            router.push("/workspace/" + workspace.id);
          }}
          className="cursor-pointer flex-col justify-start items-start capitalize"
        >
          <p className="truncate">{workspace.name}</p>
          <span className="text-xs text-muted-foreground">
            Active Workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces.map((d) => (
          <DropdownMenuItem
            key={d.id}
            className="cursor-pointer capitalize"
            onClick={() => {
              router.push("/workspace/" + d.id);
            }}
          >
            <div className="shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
              {d.name.charAt(0).toUpperCase()}
            </div>
            <p className="truncate">{d.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="size-9 relative overflow-hidden bg-[#f2f2f2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
            <PlusIcon />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
