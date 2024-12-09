"use client";

import { useState } from "react";
import { ChevronDownIcon, TrashIcon } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useDeleteChannel } from "./api/use-delete-channel";
import { useUpdateChannel } from "./api/use-update-channel-name";
import { useConfirm } from "../workspaces/hooks/use-confirm";

export const Header = ({
  name,
  id,
  workspaceId,
  isAdmin,
}: {
  name: string;
  id: string;
  workspaceId: string;
  isAdmin: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(name);

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This Action can not be undone!"
  );

  const { mutate: updateChannel, isPending: isChannel } = useUpdateChannel();
  const { mutate: removeChannel, isPending: isDeleting } = useDeleteChannel();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(v);
  };

  const updateChannelName = (e: React.FormEvent) => {
    e.preventDefault();

    updateChannel({
      json: { name: value },
      param: {
        id,
        workspaceId,
      },
    });
  };

  if (!isAdmin) {
    return (
      <div className="bg-white border-b h-[49px] px-4 overflow-hidden flex items-center">
        <span className="truncate"># {name}</span>
      </div>
    );
  }

  return (
    <div className="bg-white border-b h-[49px] px-4 overflow-hidden flex items-center">
      <ConfirmDialog />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="text-lg font-semibold px-2 overflow-hidden w-auto"
          >
            <span className="truncate"># {name}</span>
            <ChevronDownIcon
              className="ml-2"
              style={{ width: ".8rem", height: ".8rem" }}
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle># {name}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Channel Name</p>
                    <p className="text-sm text-[#1264ea] hover:underline font-semibold">
                      Edit
                    </p>
                  </div>
                  <p className="text-sm"># {name}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this Channel</DialogTitle>
                </DialogHeader>
                <form onSubmit={updateChannelName} className="space-y-4">
                  <Input
                    value={value}
                    disabled={isChannel}
                    onChange={handleChange}
                    required
                    minLength={3}
                    autoFocus
                    placeholder="e.g. plan-budget"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant={"outline"}
                        disabled={isChannel}
                      >
                        Close
                      </Button>
                    </DialogClose>
                    <Button disabled={isChannel}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <button
              disabled={isDeleting}
              onClick={async () => {
                const ok = await confirm();
                if (ok) {
                  removeChannel({
                    param: { workspaceId, id },
                  });
                }
              }}
              className="flex items-center gap-x-2 px-5 py-4 bg-white cursor-pointer rounded-lg border hover:bg-gray-50 text-rose-600"
            >
              <TrashIcon />
              <p className="text-sm font-semibold">Delete Channel</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
