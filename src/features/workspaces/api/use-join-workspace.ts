import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["workspaces"]["join"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["workspaces"]["join"]["$post"]
>;

export const useJoinWorkspace = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client["api"]["workspaces"]["join"]["$post"]({
        json,
      });

      if (!response.ok) {
        throw Error("Unable to Joined Workspace");
      }

      return await response.json();
    },
    onSuccess: async (res) => {
      toast.success("Workspace Joined successfully");
      window.location.replace("/workspace/" + res.id);
    },
    onError: () => {
      toast.error("Unable to Joined Workspace");
    },
  });

  return mutation;
};
