import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetChannels = (workspaceId: string) => {
  const query = useQuery({
    queryKey: ["channels", workspaceId],
    queryFn: async () => {
      const response = await client["api"]["channels"][":workspaceId"]["$get"]({
        param: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Unable to get channels");
      }

      return await response.json();
    },
  });

  return query;
};
