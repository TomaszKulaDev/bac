import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { TextSection } from "../types";

interface TextContentProps {
  sections: TextSection[];
}

export const TextContent: React.FC<TextContentProps> = ({ sections }) => {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <div key={index} className="space-y-4">
          {section.title && (
            <h2 className="text-2xl font-bold text-gray-900">
              {section.title}
            </h2>
          )}
          <ReactMarkdown
            className="prose prose-blue max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:mb-4 prose-ul:mb-4 prose-li:text-gray-600"
            components={{
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-600 mb-6 whitespace-pre-line">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-gray-600">{children}</li>
              ),
            }}
          >
            {section.content}
          </ReactMarkdown>

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
