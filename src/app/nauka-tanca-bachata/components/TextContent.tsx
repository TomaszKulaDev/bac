import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { TextSection } from "../types";

interface TextContentProps {
  sections: TextSection[];
}

export const TextContent: React.FC<TextContentProps> = ({ sections }) => {
  return (
    <div className="prose prose-lg max-w-none">
      {sections.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
          <ReactMarkdown className="mb-6">{section.content}</ReactMarkdown>

          {section.images && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              {section.images.map((image, imgIndex) => (
                <figure key={imgIndex} className="relative">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="rounded-lg"
                  />
                  <figcaption className="text-sm text-gray-600 mt-2">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
