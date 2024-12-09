import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["channels"][":workspaceId"][":id"]["$delete"]
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["channels"][":workspaceId"][":id"]["$delete"]
>;

export const useDeleteChannel = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client["api"]["channels"][":workspaceId"][":id"][
        "$delete"
      ]({
        param,
      });

      if (!response.ok) {
        throw Error("Unable to update Channel");
      }

      return await response.json();
    },
    onSuccess: async () => {
      toast.success("Channel Deleted successfully");
      await queryClient.invalidateQueries();
      router.replace("/");
    },
    onError: () => {
      toast.error("Unable to Deleted Channel");
    },
  });

  return mutation;
};
