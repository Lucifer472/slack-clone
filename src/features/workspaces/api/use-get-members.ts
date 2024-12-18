import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetMembersByWorkspaceId = (workspaceId: string) => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const response = await client["api"]["workspaces"][":workspaceId"][
        "members"
      ]["$get"]({ param: { workspaceId } });

      if (!response.ok) {
        return null;
      }
      return await response.json();
    },
  });

  return query;
};
