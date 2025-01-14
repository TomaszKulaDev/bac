"use client";

import { DANCE_STYLES } from "@/constants/danceStyles";
import "./styles.css";

const COLORS = {
  bg: [
    "bg-purple-100",
    "bg-amber-100",
    "bg-blue-100",
    "bg-emerald-100",
    "bg-rose-100",
    "bg-indigo-100",
  ],
  text: [
    "text-purple-600",
    "text-amber-600",
    "text-blue-600",
    "text-emerald-600",
    "text-rose-600",
    "text-indigo-600",
  ],
};

export function DanceStylesGrid() {
  return (
    <section className="py-8 bg-gray-100">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Style tańca
        </h2>
        <div className="flex overflow-x-auto pb-4 gap-8 hide-scrollbar justify-center">
          <div className="flex gap-8 px-4">
            {DANCE_STYLES.map((style, index) => (
              <div
                key={style.value}
                className="dance-style-item group"
                style={{ minWidth: "100px" }}
              >
                <div
                  className={`neumorphic-circle ${
                    COLORS.bg[index % COLORS.bg.length]
                  }`}
                >
                  <svg
                    className={`w-8 h-8 ${
                      COLORS.text[index % COLORS.text.length]
                    } transform 
                              group-hover:scale-110 transition-all duration-300`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="text-center mt-3">
                  <span className="text-sm font-medium text-gray-700">
                    {style.label}
                  </span>
                  <div className="text-xs text-gray-500">120 tancerzy</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
