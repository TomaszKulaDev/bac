import { useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";

export const useInfiniteScroll = (
  hasNextPage: boolean,
  isFetchingNextPage: boolean,
  fetchNextPage: () => void
) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("Ładowanie następnej strony...");
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { ref };
};
