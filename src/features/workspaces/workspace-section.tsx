import { useState } from "react";
import { PlusIcon, TriangleIcon } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type WorkspaceSectionProps = {
  children: React.ReactNode;
  label: string;
  hint?: string;
  onNew?: () => void;
};

export const WorkspaceSection = ({
  children,
  label,
  hint,
  onNew,
}: WorkspaceSectionProps) => {
  const [on, setOn] = useState(true);

  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center px-3.5 group">
        <Button
          variant={"transparent"}
          className="p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6"
          onClick={() => setOn((prev) => !prev)}
        >
          <TriangleIcon
            className={cn(
              "fill-[#f9edffcc]  text-[#f9edffcc] transition-transform",
              !on ? "rotate-90" : "rotate-180"
            )}
            style={{ width: ".7rem", height: ".7rem" }}
          />
        </Button>
        <Button
          variant={"transparent"}
          size={"sm"}
          className="group px-1.5 text-sm text-[#f9edffcc] h-[25px] justify-start overflow-hidden items-center"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && hint && (
          <Hint label={hint} side="top" align="center">
            <Button
              onClick={onNew}
              variant={"transparent"}
              size={"iconSm"}
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edffcc] size-6 shrink-0"
            >
              <PlusIcon />
            </Button>
          </Hint>
        )}
      </div>
      {on && children}
    </div>
  );
};
