export const PoplistaItemSkeleton = () => {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
        <div className="flex-grow">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};
