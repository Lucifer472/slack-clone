import { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type EmojiPopoverProps = {
  children: React.ReactNode;
  hint?: string;
  onEmojiSelect: (emoji: unknown) => void;
};

export const EmojiPopover = ({
  children,
  onEmojiSelect,
  hint = "Emoji",
}: EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const onSelect = (emoji: unknown) => {
    onEmojiSelect(emoji);
    setPopoverOpen(false);

    setTimeout(() => {
      setTooltipOpen(false);
    }, 500);
  };

  return (
    <TooltipProvider>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Tooltip
          open={tooltipOpen}
          onOpenChange={setTooltipOpen}
          delayDuration={50}
        >
          <>
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>{children}</TooltipTrigger>
            </PopoverTrigger>
            <TooltipContent className="bg-black text-white border-black/5">
              <p className="font-medium text-xs">{hint}</p>
            </TooltipContent>
          </>
        </Tooltip>
        <PopoverContent className="p-0 w-full border-none shadow-none">
          <Picker data={data} onEmojiSelect={onSelect} />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
