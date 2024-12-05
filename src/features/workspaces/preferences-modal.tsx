import { useState } from "react";
import { TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateWorkspace } from "./api/use-update-workspace";
import { useDeleteWorkspace } from "./api/use-delete-workspace";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

export const PreferencesModal = ({
  initialValue,
  open,
  setOpen,
  workspaceId,
}: {
  initialValue: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  workspaceId: string;
}) => {
  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);

  const { mutate: updateWorkspace, isPending: isUpdateWorkspace } =
    useUpdateWorkspace();

  const { mutate: deleteWorkspace, isPending: isDeleteWorkspace } =
    useDeleteWorkspace({ param: { workspaceId } });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-4">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <div className="px-5 py-4 bg-white border cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Workspace Name</p>
                  <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                    Edit
                  </p>
                </div>
                <p className="text-sm">{value}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename this workspace</DialogTitle>
              </DialogHeader>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  updateWorkspace({
                    json: { name: value },
                    param: { workspaceId },
                  });
                }}
              >
                <Input
                  type="text"
                  minLength={3}
                  placeholder="Workspace Name e.g. Work Or Personal"
                  value={value}
                  disabled={isUpdateWorkspace}
                  onChange={(e) => setValue(e.target.value)}
                  required
                  autoFocus
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button disabled={isUpdateWorkspace} variant={"outline"}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button disabled={isUpdateWorkspace}>Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <button
            disabled={isDeleteWorkspace}
            onClick={() => {
              deleteWorkspace({ param: { workspaceId } });
            }}
            className="flex items-center gap-x-2 px-4 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
          >
            <TrashIcon />
            <p className="text-sm font-semibold">Delete Workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
