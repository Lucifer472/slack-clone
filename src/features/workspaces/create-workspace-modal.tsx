"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useWorkspaceModal } from "./hooks/use-create-workspace-modal";
import { CreateWorkspaceSchema } from "./schema";
import { useCreateWorkspace } from "./api/use-create-workspace";

export const CreateWorkspaceModal = () => {
  const { open, setOpen } = useWorkspaceModal();
  const { mutate, isPending } = useCreateWorkspace();

  const form = useForm<z.infer<typeof CreateWorkspaceSchema>>({
    resolver: zodResolver(CreateWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  const handleCreateWorkspace = (
    values: z.infer<typeof CreateWorkspaceSchema>
  ) => {
    mutate({
      json: values,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Workspace</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleCreateWorkspace)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Workspace Name e.g. 'Work' or 'Personal'"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
