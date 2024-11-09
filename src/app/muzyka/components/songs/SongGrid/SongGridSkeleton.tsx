import React from 'react';

const SongGridSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
    {[...Array(10)].map((_, index) => (
      <div key={index} className="w-full">
        <div className="relative aspect-video rounded-md overflow-hidden bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
        </div>
        <div className="mt-2 space-y-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-2 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export default SongGridSkeleton; 