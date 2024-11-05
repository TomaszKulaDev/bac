import { useEffect } from "react";

export const RenderTracker: React.FC<{ componentName: string }> = ({ componentName }) => {
    useEffect(() => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Render] ${componentName} został wyrenderowany`);
      }
    });
  
    return null;
  };