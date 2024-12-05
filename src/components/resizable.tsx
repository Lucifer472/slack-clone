import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

import { WorkspaceSidebar } from "@/features/workspaces/workspace-sidebar";

export const Resizable = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResizablePanelGroup direction="horizontal" autoSaveId={"workspace-layout"}>
      <ResizablePanel defaultSize={20} minSize={11} className="bg-[#5e2c5f]">
        <WorkspaceSidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={20}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
};
