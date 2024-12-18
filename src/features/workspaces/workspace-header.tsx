import { useState } from "react";
import { workspaces } from "@prisma/client";
import { ChevronDownIcon, ListFilterIcon, SquarePenIcon } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PreferencesModal } from "./preferences-modal";
import { InviteModal } from "./invite-modal";

export const WorkspaceHeader = ({
  workspace,
  isAdmin,
}: {
  workspace: workspaces;
  isAdmin: boolean;
}) => {
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
      <PreferencesModal
        open={preferencesOpen}
        setOpen={setPreferencesOpen}
        workspaceId={workspace.id}
      />
      <InviteModal
        open={inviteOpen}
        setOpen={setInviteOpen}
        workspace={workspace}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"transparent"}
            className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
            size={"sm"}
          >
            <span className="truncate">{workspace.name}</span>
            <ChevronDownIcon className="ml-1 shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-64">
          <DropdownMenuItem className="cursor-pointer capitalize">
            <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col items-start">
              <p className="font-bold">{workspace.name}</p>
              <p className="text-xs text-muted-foreground">Active Workspace</p>
            </div>
          </DropdownMenuItem>
          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer py-2"
                onClick={() => setInviteOpen(true)}
              >
                Invite People to {workspace.name}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer py-2"
                onClick={() => setPreferencesOpen(true)}
              >
                Preferences
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-0.5">
        <Hint label="Filter Conversation" side="bottom">
          <Button variant={"transparent"} className="" size={"iconSm"}>
            <ListFilterIcon />
          </Button>
        </Hint>
        <Hint label="New Message" side="bottom">
          <Button variant={"transparent"} className="" size={"iconSm"}>
            <SquarePenIcon />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
