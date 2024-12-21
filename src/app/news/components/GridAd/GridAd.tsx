"use client";

import Image from "next/image";
import { GridAdProps } from "./types";

export function GridAd({ imageUrl, title, description, link }: GridAdProps) {
  return (
    <div className="relative w-[300px] h-[180px] bg-white shadow-sm">
      <div className="absolute top-0 left-0 bg-black/60 text-[10px] text-white px-2 py-0.5 z-10">
        Materiał promocyjny
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full group"
      >
        <div className="relative h-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="300px"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-white font-bold text-base leading-tight mb-1">
                {title}
              </h3>
              {description && (
                <p className="text-white/90 text-sm line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
