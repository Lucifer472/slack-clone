import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaceById = ({
  param,
}: {
  param: { workspaceId: string };
}) => {
  const query = useQuery({
    queryKey: ["workspace", param],
    queryFn: async () => {
      const response = await client["api"]["workspaces"][":workspaceId"][
        "$get"
      ]({ param });

      if (!response.ok) {
        return null;
      }
      return await response.json();
    },
  });

  return query;
};
