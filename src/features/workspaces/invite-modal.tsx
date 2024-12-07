import { workspaces } from "@prisma/client";
import { CopyIcon, Loader, RefreshCcwIcon } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { SITE_URL } from "@/config";

import { useUpdateWorkspace } from "./api/use-update-workspace";
import { useConfirm } from "./hooks/use-confirm";

type InviteModalProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  workspace: workspaces;
};

export const InviteModal = ({ open, setOpen, workspace }: InviteModalProps) => {
  const { mutate, isPending } = useUpdateWorkspace();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This will deactivate current join code and generate a new one!"
  );

  const handleCopy = () => {
    const inviteLink = `${SITE_URL}/join/${workspace.id}?joinCode=${workspace.joinCode}`;

    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success("Invite Link Copied");
    });
  };

  return (
    <>
      <ConfirmDialog />
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
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                workspace.joinCode
              )}
            </p>
            <Button
              variant={"ghost"}
              disabled={isPending}
              size={"sm"}
              onClick={handleCopy}
            >
              <span>Copy Link</span>
              <CopyIcon className="ml-2" />
            </Button>
          </div>
          <div className="flex items-center justify-between w-full">
            <Button
              onClick={async () => {
                const ok = await confirm();
                if (ok) {
                  mutate({
                    json: { joinCode: true },
                    param: { workspaceId: workspace.id },
                  });
                }
              }}
              variant={"outline"}
              disabled={isPending}
            >
              New Code
              <RefreshCcwIcon className="ml-2" />
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
