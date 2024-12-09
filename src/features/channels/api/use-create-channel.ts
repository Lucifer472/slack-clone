import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["channels"][":workspaceId"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["channels"][":workspaceId"]["$post"]
>;

export const useCreateChannels = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client["api"]["channels"][":workspaceId"]["$post"](
        {
          json,
          param,
        }
      );

      if (!response.ok) {
        throw Error("Unable to create Workspace");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Channel Created successfully");
      queryClient.invalidateQueries({ queryKey: ["channels"] });
    },
    onError: () => {
      toast.error("Unable to create Channel");
    },
  });

  return mutation;
};
