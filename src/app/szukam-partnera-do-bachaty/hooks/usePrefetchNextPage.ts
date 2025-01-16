import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { UserProfile } from "@/types/user";

interface FetchProfilesResponse {
  profiles: UserProfile[];
  nextPage: number;
  hasMore: boolean;
}

export const usePrefetchNextPage = (
  data: { pages: FetchProfilesResponse[] } | undefined,
  queryKey: string[],
  fetchFn: (pageParam: number) => Promise<FetchProfilesResponse>
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.pages[data.pages.length - 1]?.hasMore) {
      const nextPage = data.pages[data.pages.length - 1].nextPage;

      queryClient.prefetchInfiniteQuery({
        queryKey,
        queryFn: () => fetchFn(nextPage),
        initialPageParam: nextPage,
      });
    }
  }, [data?.pages, queryClient, queryKey, fetchFn]);
};
