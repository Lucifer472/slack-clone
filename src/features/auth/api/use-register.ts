import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["auth-route"]["register"]["$post"]
>;

type RequestType = InferRequestType<
  (typeof client)["api"]["auth-route"]["register"]["$post"]
>;

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client["api"]["auth-route"]["register"]["$post"]({
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
      toast.success("Registered Successfully!");
    },
  });

  return mutation;
};
