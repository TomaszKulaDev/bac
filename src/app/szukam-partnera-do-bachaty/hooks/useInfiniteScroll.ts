import { useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";

export const useInfiniteScroll = (
  hasMore: boolean,
  isLoading: boolean,
  loadMore: () => void,
  threshold = 0.5,
  rootMargin = "200px"
) => {
  const loadingRef = useRef(false);
  const { ref, inView } = useInView({ threshold, rootMargin });

  const handleIntersection = useCallback(() => {
    if (inView && hasMore && !isLoading && !loadingRef.current) {
      loadingRef.current = true;
      loadMore();
    }
  }, [inView, hasMore, isLoading, loadMore]);

  useEffect(() => {
    handleIntersection();
    if (!isLoading) {
      loadingRef.current = false;
    }
  }, [handleIntersection, isLoading]);

  return { ref };
};
