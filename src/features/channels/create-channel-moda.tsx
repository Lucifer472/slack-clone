import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useChannelModal } from "./hooks/use-create-channel-modal";
import { useWorkspaceId } from "../workspaces/hooks/use-workspace-id";

import { useCreateChannels } from "./api/use-create-channel";

export const CreateChannelModal = () => {
  const { open, setOpen } = useChannelModal();
  const [name, setName] = useState("");

  const workspaceId = useWorkspaceId();

  const { mutate, isPending } = useCreateChannels();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(v);
  };

  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Channel</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            mutate(
              { json: { name }, param: { workspaceId } },
              {
                onSuccess: () => {
                  handleClose();
                },
              }
            );
          }}
        >
          <Input
            type="text"
            value={name}
            onChange={handleChange}
            autoFocus
            required
            minLength={3}
            placeholder="e.g. plan-budget"
            disabled={isPending}
          />
          <div className="flex gap-x-2.5 justify-end">
            <Button
              variant={"outline"}
              disabled={isPending}
              onClick={handleClose}
              type="button"
            >
              Cancel
            </Button>
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
