import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["workspaces"][":workspaceId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["workspaces"][":workspaceId"]["$patch"]
>;

export const useUpdateWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client["api"]["workspaces"][":workspaceId"][
        "$patch"
      ]({
        json,
        param,
      });

      if (!response.ok) {
        throw Error("Unable to update Workspace");
      }

      return await response.json();
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [res.data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
      router.refresh();
      toast.success("Workspace Updated successfully");
    },
    onError: () => {
      toast.error("Unable to update Workspace");
    },
  });

  return mutation;
};
