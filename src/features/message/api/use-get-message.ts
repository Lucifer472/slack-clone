import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetMessage = ({
  queryParams,
}: {
  queryParams: {
    channelId?: string;
    conversionId?: string;
    parentMessageId?: string;
    page: string;
  };
}) => {
  const query = useQuery({
    queryKey: ["messages", queryParams],
    queryFn: async () => {
      const response = await client["api"]["message"]["$get"]({
        query: queryParams,
      });

      if (!response.ok) {
        throw new Error("Unable to get channels");
      }

      return await response.json();
    },
  });

  return query;
};
