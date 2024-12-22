"use client";

import Link from "next/link";
import Image from "next/image";
import { NewsItem } from "./types";

interface RightSideBarProps {
  topics: NewsItem[];
} 

export function RightSideBar({ topics }: RightSideBarProps) {
  // Sortujemy tematy od najstarszych do najnowszych
  const sortedTopics = [...topics].sort((a, b) => {
    return new Date(a.date || "").getTime() - new Date(b.date || "").getTime();
  });

  const limitedTopics = sortedTopics.slice(0, 7);

  return (
    <div className="bg-white rounded-lg p-5">
      <div className="mb-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="bg-[#e90636] rounded-md w-6 h-6 flex items-center justify-center">
            <span className="font-semibold text-white text-sm">W</span>
          </div>
          <span className="font-semibold text-base text-gray-900">
            Warto wiedzieć
          </span>
        </div>
      </div>

      <div className="space-y-5">
        {limitedTopics.map((topic, index) => (
          <Link
            href={`/news/${topic.url}`}
            key={topic.id}
            className="group block"
          >
            <div className="flex gap-3">
              <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={topic.image}
                  alt={topic.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex-1">
                {topic.category && (
                  <span className="text-xs font-medium text-[#e90636] uppercase tracking-wide block mb-1">
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
            </div>
            {index !== limitedTopics.length - 1 && (
              <div className="mt-4 border-b border-gray-100" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
