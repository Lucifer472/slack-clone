import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["workspaces"][":workspaceId"]["$delete"]
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["workspaces"][":workspaceId"]["$delete"]
>;

export const useDeleteWorkspace = ({
  param,
}: {
  param: { workspaceId: string };
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client["api"]["workspaces"][":workspaceId"][
        "$delete"
      ]({
        param,
      });

      if (!response.ok) {
        throw Error("Unable to update Workspace");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Workspace Deleted successfully");
      queryClient.invalidateQueries();
      router.push("/");
    },
    onError: () => {
      toast.error("Unable to Deleted Workspace");
    },
  });

  return mutation;
};
