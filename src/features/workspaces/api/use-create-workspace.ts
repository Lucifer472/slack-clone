import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["workspaces"]["create"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["workspaces"]["create"]["$post"]
>;

export const useCreateWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client["api"]["workspaces"]["create"]["$post"]({
        json,
      });

      if (!response.ok) {
        throw Error("Unable to create Workspace");
      }

      return await response.json();
    },
    onSuccess: (res) => {
      toast.success("Workspace created successfully");
      router.push("/workspace/" + res.data.id);
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: () => {
      toast.error("Unable to create Workspace");
    },
  });

  return mutation;
};
