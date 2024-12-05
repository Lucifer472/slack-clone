import { UserButton } from "@/features/auth/user-button";

import { WorkspaceSwitcher } from "./workspace-switcher";
import { SidebarButton } from "./sidebar-button";
import {
  BellIcon,
  HomeIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
} from "lucide-react";

const sidebarButtons = [
  {
    icon: HomeIcon,
    label: "Home",
  },
  {
    icon: MessageSquareIcon,
    label: "DMs",
  },
  {
    icon: BellIcon,
    label: "Activity",
  },
  {
    icon: MoreHorizontalIcon,
    label: "More",
  },
];

export const Sidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4">
      <WorkspaceSwitcher />
      {sidebarButtons.map((s, index) => (
        <SidebarButton
          icon={s.icon}
          label={s.label}
          isActive={index === 0}
          key={s.label}
        />
      ))}
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
