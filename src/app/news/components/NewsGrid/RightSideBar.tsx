"use client";

import Link from "next/link";
import { NewsItem } from "./types";

interface RightSideBarProps {
  topics: NewsItem[];
}

export function RightSideBar({ topics }: RightSideBarProps) {
  // Sortujemy tematy od najstarszych do najnowszych
  const sortedTopics = [...topics].sort((a, b) => {
    return new Date(a.date || "").getTime() - new Date(b.date || "").getTime();
  });

  const limitedTopics = sortedTopics.slice(0, 11);

  return (
    <div className="bg-white rounded-lg p-5">
      <div className="mb-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="bg-[#e90636] rounded-md w-6 h-6 flex items-center justify-center">
            <span className="font-semibold text-white text-sm">N</span>
          </div>
          <span className="font-semibold text-base text-gray-900">
            Najnowsze
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {limitedTopics.map((topic, index) => (
          <div key={topic.id}>
            <Link href={`/news/${topic.url}`} className="group block">
              <div className="space-y-1">
                {topic.category && (
                  <span className="text-xs font-medium text-[#e90636] uppercase tracking-wide block">
                    {topic.category}
                  </span>
                )}
                <h3
                  className={`text-[15px] leading-tight ${
                    topic.isHighlighted
                      ? "font-medium text-gray-900"
                      : "font-normal text-gray-700"
                  } group-hover:text-[#e90636] transition-colors duration-200`}
                >
                  {topic.title}
                </h3>
              </div>
            </Link>
            {index !== limitedTopics.length - 1 && (
              <div className="mt-4 border-b border-gray-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
