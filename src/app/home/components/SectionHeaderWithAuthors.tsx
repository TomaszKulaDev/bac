"use client";

import Image from "next/image";
import { Author } from "../types/article";

interface SectionHeaderWithAuthorsProps {
  letter: string;
  title: string;
  authors: Author[];
  sectionLabel?: string;
}

export default function SectionHeaderWithAuthors({
  letter,
  title,
  authors,
  sectionLabel = "PISZĄ DLA NAS:",
}: SectionHeaderWithAuthorsProps) {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <div className="bg-[#ffd200] rounded-full w-8 h-8 flex items-center justify-center mr-2">
          <span className="font-bold text-black">{letter}</span>
        </div>
        <h2 className="text-base font-bold uppercase">{title}</h2>
      </div>
      <div className="ml-6 flex items-center">
        <span className="text-sm text-gray-500 mr-3">{sectionLabel}</span>
        <div className="flex -space-x-3">
          {authors.slice(0, 4).map((author, index) => (
            <div
              key={author.name}
              className="relative group"
              style={{ zIndex: authors.length - index }}
            >
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm transition-transform duration-200 hover:scale-110">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-black text-white text-xs py-1 px-2 rounded shadow-lg">
                  <p className="font-medium whitespace-nowrap">{author.name}</p>
                  <p className="text-gray-300 text-[10px]">{author.role}</p>
                </div>
                <div className="w-2 h-2 bg-black transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
              </div>
            </div>
          ))}
          {authors.length > 4 && (
            <button className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors relative z-0">
              +{authors.length - 4}
            </button>
          )}
        </div>
        <button className="ml-2 text-gray-400 hover:text-gray-600 transition-colors">
          <span className="sr-only">Pokaż więcej autorów</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
