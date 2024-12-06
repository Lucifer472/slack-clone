import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaceById = (workspaceId: string) => {
  const query = useQuery({
    queryKey: [workspaceId],
    queryFn: async () => {
      const response = await client["api"]["workspaces"][":workspaceId"][
        "$get"
      ]({ param: { workspaceId } });

      if (!response.ok) {
        return null;
      }
      return await response.json();
    },
  });

  return query;
};
