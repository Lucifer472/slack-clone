import { useInfiniteQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetMessages = ({
  queryParams,
}: {
  queryParams: {
    channelId?: number;
    conversionId?: number;
    parentMessageId?: number;
  };
}) => {
  const query = useInfiniteQuery({
    queryKey: ["messages", queryParams],
    queryFn: async ({ pageParam }) => {
      const response = await client["api"]["message"]["$get"]({
        query: { ...queryParams, page: pageParam },
      });

      if (!response.ok) {
        throw new Error("Unable to get channels");
      }

      return await response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (data) => data.nextPage,
  });

  return query;
};
