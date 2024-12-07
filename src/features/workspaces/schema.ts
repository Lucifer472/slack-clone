import { z } from "zod";

export const CreateWorkspaceSchema = z.object({
  name: z.string().min(3, {
    message: "Name is required and should be at lest 3 characters long",
  }),
});

export const UpdateWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name is required and should be at lest 3 characters long",
    })
    .optional(),
  joinCode: z.boolean().optional(),
});

export const JoinWorkspaceSchema = z.object({
  joinCode: z.string().length(6),
  workspaceId: z.string().min(5),
});
