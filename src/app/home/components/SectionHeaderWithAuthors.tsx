"use client";

import Image from "next/image";
import { Author } from "../types/article";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface SectionHeaderWithAuthorsProps {
  letter: string;
  title: string;
  authors: Author[];
  sectionLabel?: string;
  linkUrl?: string;
  linkText?: string;
  variant?: "default" | "compact" | "featured";
}

export default function SectionHeaderWithAuthors({
  letter,
  title,
  authors,
  sectionLabel = "PISZĄ DLA NAS:",
  linkUrl,
  linkText,
  variant = "default",
}: SectionHeaderWithAuthorsProps) {
  const [showAuthorsPanel, setShowAuthorsPanel] = useState(false);

  const toggleAuthorsPanel = () => {
    setShowAuthorsPanel(!showAuthorsPanel);
  };

  // Shared header component used in all variants
  const HeaderSection = () => (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-[#ffd200] w-8 h-8 flex items-center justify-center mr-3 shadow-sm">
          <span className="font-bold text-gray-900">{letter}</span>
        </div>
        <h2 className="text-base font-bold uppercase tracking-wide text-gray-900">
          {title}
        </h2>
      </div>

      {linkUrl && variant !== "default" && (
        <Link
          href={linkUrl}
          className="text-xs text-gray-500 hover:text-[#ffd200] transition-colors flex items-center gap-1"
        >
          <span>{linkText || "Zobacz więcej"}</span>
          <svg
            className="w-3 h-3"
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
        </Link>
      )}
    </div>
  );

  // Link component used in multiple places
  const LinkComponent = () => (
    <Link
      href={linkUrl!}
      className="text-xs text-gray-500 hover:text-[#ffd200] transition-colors flex items-center gap-1"
    >
      <span>{linkText || "Zobacz więcej"}</span>
      <svg
        className="w-3 h-3"
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
    </Link>
  );

  // Compact variant - tylko nagłówek z opcją "Zobacz więcej"
  if (variant === "compact") {
    return (
      <div className="mb-4 border-b border-gray-100 pb-2">
        <HeaderSection />
      </div>
    );
  }

  // Featured variant - nagłówek z wyróżnionymi autorami poniżej
  if (variant === "featured") {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
          <HeaderSection />
        </div>

        {/* Authors showcase */}
        <div className="mb-4">
          <h3 className="text-xs font-medium text-gray-500 mb-3">
            {sectionLabel}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {authors.map((author) => (
              <Link
                href={`/autor/${author.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                key={author.name}
                className="group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden mb-2 border-2 border-white shadow-sm group-hover:border-[#ffd200] transition-colors">
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-medium text-gray-900 group-hover:text-[#ffd200] transition-colors">
                    {author.name}
                  </p>
                  <p className="text-[10px] text-gray-500">{author.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default variant - nagłówek z przyciskiem pokazującym autorów
  return (
    <div className="mb-4 border-b border-gray-100 pb-2">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left side - Section title */}
        <div className="flex items-center">
          <div className="bg-[#ffd200] w-8 h-8 flex items-center justify-center mr-3 shadow-sm">
            <span className="font-bold text-gray-900">{letter}</span>
          </div>
          <h2 className="text-base font-bold uppercase tracking-wide text-gray-900">
            {title}
          </h2>

          {linkUrl && (
            <Link
              href={linkUrl}
              className="ml-4 text-xs text-gray-500 hover:text-[#ffd200] transition-colors hidden md:flex items-center gap-1"
            >
              <span>{linkText || "Zobacz więcej"}</span>
              <svg
                className="w-3 h-3"
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
            </Link>
          )}
        </div>

        {/* Right side - Authors button */}
        <div className="flex items-center">
          <button
            onClick={toggleAuthorsPanel}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors py-1.5 px-3 hover:bg-gray-50 border border-gray-100"
            aria-expanded={showAuthorsPanel}
            aria-controls="authors-panel"
          >
            <span className="font-medium">{sectionLabel}</span>
            <div className="flex -space-x-1.5">
              {authors.slice(0, 3).map((author, index) => (
                <div
                  key={author.name}
                  className="relative"
                  style={{ zIndex: 10 - index }}
                >
                  <div className="w-5 h-5 rounded-full border border-white overflow-hidden">
                    <Image
                      src={author.avatar}
                      alt=""
                      width={20}
                      height={20}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${
                showAuthorsPanel ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Authors panel */}
      <AnimatePresence>
        {showAuthorsPanel && (
          <motion.div
            id="authors-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 bg-gray-50 border border-gray-100 p-3 overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {authors.map((author) => (
                <Link
                  href={`/autor/${author.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  key={author.name}
                  className="flex items-center gap-3 p-2 hover:bg-white group min-w-[250px]"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#ffd200] flex-shrink-0">
                    <Image
                      src={author.avatar}
                      alt=""
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-[#ffd200] transition-colors line-clamp-1">
                      {author.name}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {author.role}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile link */}
      {linkUrl && (
        <div className="mt-2 md:hidden">
          <LinkComponent />
        </div>
      )}
    </div>
  );
}
