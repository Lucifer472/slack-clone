import { useQueryState, parseAsBoolean } from "nuqs";

export const useWorkspaceModal = () => {
  const [open, setOpen] = useQueryState(
    "workspace-modal",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  return { open, setOpen };
};
