import { useCallback, useEffect, useState } from "react";

export const useVirtualization = (
  totalItems: number,
  itemHeight: number,
  containerHeight: number,
  overscan = 3
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useCallback(() => {
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscan
    );
    const endIndex = Math.min(
      totalItems,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    return {
      startIndex,
      endIndex,
      items: Array.from(
        { length: endIndex - startIndex },
        (_, i) => startIndex + i
      ),
    };
  }, [scrollTop, itemHeight, containerHeight, totalItems, overscan]);

  return {
    visibleItems: visibleItems(),
    onScroll: (e: React.UIEvent<HTMLDivElement>) =>
      setScrollTop(e.currentTarget.scrollTop),
  };
};
