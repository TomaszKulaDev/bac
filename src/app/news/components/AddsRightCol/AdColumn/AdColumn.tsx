"use client";

import Image from "next/image";

export interface AdProps {
  imageUrl: string;
  title: string;
  description?: string;
  link: string;
}

export function AdColumn({ imageUrl, title, description, link }: AdProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white mt-8">
      <a href={link} className="block group">
        <div className="relative aspect-[4/5]">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
        {description && (
          <div className="p-4 space-y-2">
            <h3 className="font-bold text-sm">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
            <span className="text-[#e90636] text-sm font-medium group-hover:underline">
              Dowiedz się więcej →
            </span>
          </div>
        )}
      </a>
    </div>
  );
}
//
