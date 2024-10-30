// src/components/ui/Tooltip.tsx
import React, { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="group relative">
      {children}
      <div className="absolute hidden group-hover:block bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
        {content}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
      </div>
    </div>
  );
};
