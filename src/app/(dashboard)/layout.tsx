import { redirect } from "next/navigation";

import { session } from "@/lib/session";
import { Modals } from "@/components/modal";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await session();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <main className="w-full h-full">
      <Modals />
      {children}
    </main>
  );
};

export default DashboardLayout;
