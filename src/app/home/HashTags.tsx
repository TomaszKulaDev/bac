"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PopularTags() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Popularne tagi
  const popularTags = [
    "bachata",
    "taniec",
    "muzyka",
    "festiwal",
    "kurs",
    "początkujący",
    "sensual",
    "dominicana",
    "moderna",
    "tradicional",
    "partnerzy",
    "body movement",
    "szkoły",
    "konkursy",
    "warsztaty",
    "social",
    "technika",
    "figury",
    "prowadzenie",
    "styling",
    "footwork",
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-5 border-b border-gray-200 pb-3">
        <h2 className="text-xl font-bold text-gray-900">Popularne tagi</h2>
        <Link
          href="/tagi"
          className="text-sm font-medium text-gray-600 hover:text-amber-700 transition-colors"
        >
          Wszystkie tagi
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {popularTags.map((tag) => (
          <motion.div
            key={tag}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setActiveTag(tag)}
            onHoverEnd={() => setActiveTag(null)}
          >
            <Link
              href={`/tag/${tag}`}
              className={`inline-block px-3 py-1.5 rounded-none transition-all ${
                activeTag === tag
                  ? "bg-amber-100 text-amber-800"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              #{tag}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
