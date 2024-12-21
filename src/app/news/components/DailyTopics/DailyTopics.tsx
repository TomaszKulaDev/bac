"use client";

import Link from "next/link";
import { TopicItem } from "./types";

interface DailyTopicsProps {
  topics: TopicItem[];
}

export function DailyTopics({ topics }: DailyTopicsProps) {
  return (
    <div>
      {/* Header TEMATY DNIA */}
      <div className="mb-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-gray-200">
          <div className="bg-red-600 rounded-full w-[22px] h-[22px] flex items-center justify-center shadow-sm">
            <span className="font-bold text-white text-[13px] leading-none">
              T
            </span>
          </div>
          <span className="font-bold text-[13px] tracking-wider text-gray-900">
            TEMATY DNIA
          </span>
        </div>
      </div>

      {/* Lista tematów */}
      <div className="space-y-[18px]">
        {topics.map((topic) => (
          <Link
            href={`/news/${topic.id}`}
            key={topic.id}
            className="group block"
          >
            <div className="flex flex-col gap-1">
              {topic.category && (
                <span className="text-[11px] font-bold text-blue-600">
                  {topic.category}
                </span>
              )}
              <h3
                className={`text-[13px] leading-[1.4] ${
                  topic.isHighlighted ? "font-bold" : "font-normal"
                } text-gray-900 group-hover:text-gray-900`}
              >
                {topic.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
