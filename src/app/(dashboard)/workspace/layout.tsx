import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Resizable } from "@/components/resizable";

import { WebSocketProvider } from "@/components/socket-wrapper";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebSocketProvider>
      <div className="w-full min-h-screen">
        <Navbar />
        <div className="flex h-[calc(100vh-40px)]">
          <Sidebar />
          <Resizable>{children}</Resizable>
        </div>
      </div>
    </WebSocketProvider>
  );
};

export default WorkspaceLayout;
