import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Resizable } from "@/components/resizable";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <Resizable>{children}</Resizable>
      </div>
    </div>
  );
};

export default WorkspaceLayout;
