import Link from "next/link";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

import { useWorkspaceId } from "./hooks/use-workspace-id";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type UserItemProps = {
  id: string;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVariance>["variant"];
};

const userItemVariance = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
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

export const UserItem = ({
  id,
  image,
  label = "Member",
  variant,
}: UserItemProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button
      variant={"transparent"}
      className={cn(userItemVariance({ variant }))}
      size={"sm"}
      asChild
    >
      <Link href={"/workspace/" + workspaceId + "/member/" + id}>
        <Avatar className="size-5 rounded-md mr-1">
          <AvatarImage className="rounded-md" src={image}></AvatarImage>
          <AvatarFallback className="rounded-md bg-sky-500 text-xs">
            {label.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
