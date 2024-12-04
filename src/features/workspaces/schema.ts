import { z } from "zod";

export const CreateWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name is required and should be at lest 3 characters long",
    }),
});
