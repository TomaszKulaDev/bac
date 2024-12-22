"use client";

import Link from "next/link";
import { TopicItem } from "./types";

interface DailyTopicsProps {
  topics: TopicItem[];
}

export function DailyTopics({ topics }: DailyTopicsProps) {
  // Ograniczamy listę do pierwszych 8 tematów
  const limitedTopics = topics.slice(0, 8);

  return (
    <div className="bg-white rounded-lg p-5">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="bg-[#e90636] rounded-md w-6 h-6 flex items-center justify-center">
            <span className="font-semibold text-white text-sm">T</span>
          </div>
          <span className="font-semibold text-base text-gray-900">
            Tematy dnia
          </span>
        </div>
      </div>

      {/* Lista tematów */}
      <div className="space-y-5">
        {limitedTopics.map((topic, index) => (
          <Link
            href={`/news/${topic.id}`}
            key={topic.id}
            className="group block"
          >
            <div className="flex flex-col gap-1.5">
              {topic.category && (
                <span className="text-xs font-medium text-[#e90636] uppercase tracking-wide">
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
              {index !== limitedTopics.length - 1 && (
                <div className="pt-5 border-b border-gray-100" />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
