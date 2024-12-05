import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetMembersByUserIdWorkspaceId = ({
  param,
}: {
  param: { workspaceId: string };
}) => {
  const query = useQuery({
    queryKey: ["members", param],
    queryFn: async () => {
      const response = await client["api"]["workspaces"][":workspaceId"][
        "members"
      ]["$get"]({ param });

      if (!response.ok) {
        return null;
      }
      return await response.json();
    },
  });

  return query;
};
