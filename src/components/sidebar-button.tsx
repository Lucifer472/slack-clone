import { LucideIcon } from "lucide-react";

import { Button } from "./ui/button";

import { cn } from "@/lib/utils";

type SidebarButtonProps = {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
};

export const SidebarButton = ({
  label,
  isActive,
  icon: Icon,
}: SidebarButtonProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group">
      <Button
        variant={"transparent"}
        className={cn(
          "size-9 p-2 group-hover:bg-accent/20",
          isActive && "bg-accent/20"
        )}
      >
        <Icon
          className="text-white group-hover:scale-110 transition-all"
          style={{ width: "1.25rem", height: "1.25rem" }}
        />
      </Button>
      <span className="text-[11px] text-white group-hover:text-accent">
        {label}
      </span>
    </div>
  );
};
