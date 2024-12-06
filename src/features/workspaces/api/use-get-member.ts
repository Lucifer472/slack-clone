import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetMemberByUserIdWorkspaceId = (workspaceId: string) => {
  const query = useQuery({
    queryKey: ["member", workspaceId],
    queryFn: async () => {
      const response = await client["api"]["workspaces"][":workspaceId"][
        "member"
      ]["$get"]({ param: { workspaceId } });

      if (!response.ok) {
        return null;
      }
      return await response.json();
    },
  });

  return query;
};
