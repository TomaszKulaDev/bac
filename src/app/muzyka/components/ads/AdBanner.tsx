"use client";

import Script from "next/script";
import { useState } from "react";

export const AdBanner = () => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  return (
    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100 text-sm sm:text-base">
      <div className="mt-4">
        {!isAdLoaded && (
          <div className="text-center text-gray-500">Ładowanie reklamy...</div>
        )}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8585871789466302"
          data-ad-slot="6813774647"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <Script
          id="adsbygoogle-script"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8585871789466302"
          onLoad={() => setIsAdLoaded(true)}
        />
        <Script
          id="adsbygoogle-push"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({});
            `,
          }}
        />
      </div>
    </div>
  );
};
