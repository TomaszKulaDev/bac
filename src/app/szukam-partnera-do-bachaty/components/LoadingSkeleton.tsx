import { memo } from "react";

const LoadingSkeleton = memo(() => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 lg:gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="break-inside-avoid mb-4 sm:mb-6 lg:mb-8">
          <div className="relative aspect-[3/4]">
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gray-200 animate-pulse" />
              <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-2/3" />
                <div className="h-3 bg-gray-300 rounded animate-pulse w-1/2" />
                <div className="flex gap-1">
                  <div className="h-3 bg-gray-300 rounded animate-pulse w-16" />
                  <div className="h-3 bg-gray-300 rounded animate-pulse w-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

LoadingSkeleton.displayName = "LoadingSkeleton";

export default LoadingSkeleton;
