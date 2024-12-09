import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetChannel = (workspaceId: string, channelId: string) => {
  const query = useQuery({
    queryKey: [channelId, workspaceId],
    queryFn: async () => {
      const response = await client["api"]["channels"][":workspaceId"][":id"][
        "$get"
      ]({
        param: { workspaceId, id: channelId },
      });

      if (!response.ok) {
        throw new Error("Unable to get channels");
      }

      return await response.json();
    },
  });

  return query;
};
