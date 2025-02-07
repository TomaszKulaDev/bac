export const PoplistaItemSkeleton = () => {
  return (
    <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-2 sm:p-4 border border-gray-100 h-[72px] sm:h-[84px] relative overflow-hidden">
      <div className="flex items-center gap-2 sm:gap-4 h-full">
        <div className="w-6 sm:w-12">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-lg overflow-hidden">
          <div className="absolute inset-0 loading-shimmer" />
        </div>

        <div className="flex-grow space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4 overflow-hidden">
            <div className="absolute inset-0 loading-shimmer" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-1/2 overflow-hidden">
            <div className="absolute inset-0 loading-shimmer" />
          </div>
        </div>

        <div className="w-[60px] sm:w-[80px] h-8 bg-gray-200 rounded-full overflow-hidden">
          <div className="absolute inset-0 loading-shimmer" />
        </div>
      </div>
    </div>
  );
};
