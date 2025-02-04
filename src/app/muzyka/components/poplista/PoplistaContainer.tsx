"use client";

import { PoplistaHeader } from "./PoplistaHeader";
import { PoplistaList } from "./PoplistaList";
import { PoplistaFilters } from "./PoplistaFilters";

export const PoplistaContainer = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <PoplistaHeader />
      <PoplistaFilters />
      <PoplistaList />
    </div>
  );
};
