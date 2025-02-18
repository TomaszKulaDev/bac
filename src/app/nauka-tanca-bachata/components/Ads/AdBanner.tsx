"use client";

// reklama jest dodana w page.tsx

import React, { useEffect, useState } from "react";

export const AdBanner: React.FC = () => {
  const [isAdBlocked, setIsAdBlocked] = useState(false);

  useEffect(() => {
    try {
      // Sprawdzamy czy skrypt AdSense jest załadowany
      if (typeof window !== "undefined") {
        // Timeout do sprawdzenia czy reklama się załadowała
        const timeoutId = setTimeout(() => {
          const adElement = document.querySelector(".adsbygoogle");
          if (adElement && adElement.innerHTML.length === 0) {
            setIsAdBlocked(true);
          }
        }, 2000); // Sprawdzamy po 2 sekundach

        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );

        return () => clearTimeout(timeoutId);
      }
    } catch (error) {
      console.error("Error initializing ad:", error);
      setIsAdBlocked(true);
    }
  }, []);

  return (
    <div className="w-full my-2 min-h-[100px] relative">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8585871789466302"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8585871789466302"
        data-ad-slot="2106187532"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      {isAdBlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg">
          <div className="text-center p-2">
            <p className="text-gray-600 text-sm">
              To jest miejsce na Twoją reklamę
            </p>
            <p className="text-gray-400 text-xs mt-1">
              (Reklama może być blokowana przez AdBlock)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
