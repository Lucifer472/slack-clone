import { useQueryState, parseAsBoolean } from "nuqs";

export const useAuthScreen = () => {
  const [state, setState] = useQueryState(
    "sign-up",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  return { state, setState };
};
