import React from 'react';

const SongItemSkeleton = () => (
  <div className="animate-pulse flex space-x-4 p-4 bg-white rounded-xl">
    <div className="w-14 h-14 bg-gray-200 rounded-lg" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

export default SongItemSkeleton;