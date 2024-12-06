import { useQueryState, parseAsBoolean } from "nuqs";

export const useChannelModal = () => {
  const [open, setOpen] = useQueryState(
    "channel-modal",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  return { open, setOpen };
};
