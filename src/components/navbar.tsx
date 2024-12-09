"use client";
import { Info, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGetWorkspaceById } from "@/features/workspaces/api/use-get-workspace-by-id";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const Navbar = () => {
  const workspaceId = useWorkspaceId();

  const { data } = useGetWorkspaceById(workspaceId);

  if (!data || !data.data) {
    return;
  }

  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1"></div>
      <div className="min-w-[280px] max-w-[642px] grow-[2] shrink">
        <Button
          size={"sm"}
          className="bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2"
        >
          <Search className="text-white mr-2" />
          <span className="text-white text-xs">Search {data.data.name}</span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-center">
        <Button variant={"transparent"} size={"iconSm"}>
          <Info
            style={{ width: "1.25rem", height: "1.25rem" }}
            className="text-white"
          />
        </Button>
      </div>
    </nav>
  );
};
