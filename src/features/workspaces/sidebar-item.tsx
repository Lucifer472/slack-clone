"use client";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "./hooks/use-workspace-id";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  label: string;
  id: string;
  icon: LucideIcon;
  variant?: VariantProps<typeof sidebarItemVariance>["variant"];
};

const sidebarItemVariance = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const SidebarItem = ({
  icon: Icon,
  id,
  label,
  variant,
}: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button
      variant={"transparent"}
      size={"sm"}
      className={cn(sidebarItemVariance({ variant }))}
      asChild
    >
      <Link href={"/workspace/" + workspaceId + "/channel/" + id}>
        <Icon className="mr-1 shrink-0" />
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
