import { workspaces } from "@prisma/client";
import { CopyIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { SITE_URL } from "@/config";
import { toast } from "sonner";

type InviteModalProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  workspace: workspaces;
};

export const InviteModal = ({ open, setOpen, workspace }: InviteModalProps) => {
  const handleCopy = () => {
    const inviteLink = `${SITE_URL}/join/${workspace.joinCode}`;

    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success("Invite Link Copied");
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite People to {workspace.name}</DialogTitle>
          <DialogDescription>
            Use the code below to Invite People to your workspace
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4 items-center justify-center py-10">
          <p className="text-4xl font-bold tracking-widest">
            {workspace.joinCode}
          </p>
          <Button variant={"ghost"} size={"sm"} onClick={handleCopy}>
            <span>Copy Link</span>
            <CopyIcon className="ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
