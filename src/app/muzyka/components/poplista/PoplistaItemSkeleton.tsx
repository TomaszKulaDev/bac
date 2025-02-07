export const PoplistaItemSkeleton = () => {
  return (
    <div className="bg-gray-50 rounded-xl p-2 sm:p-4 border border-gray-100 h-[72px] sm:h-[84px]">
      <div className="flex items-center gap-2 sm:gap-4 h-full">
        <div className="w-6 sm:w-12 animate-pulse">
          <div className="h-6 bg-gray-200 rounded" />
        </div>

        <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-lg animate-pulse" />

        <div className="flex-grow space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>

        <div className="w-[60px] sm:w-[80px] h-8 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  );
};
