import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["auth-route"]["login"]["$post"]
>;

type RequestType = InferRequestType<
  (typeof client)["api"]["auth-route"]["login"]["$post"]
>;

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client["api"]["auth-route"]["login"]["$post"]({
        json,
      });

      if (!response.ok) {
        throw new Error("unable to login");
      }

      return await response.json();
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
      toast.success("Logged in Successfully!");
    },
    onError: () => {
      toast.error("Unable to Login!");
    },
  });

  return mutation;
};
