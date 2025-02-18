"use client";

//  komponent jest umieszczony w LatestProfiles.tsx
//  reklama znajduje sie w LatestProfiles.tsx
{
  /* nazwa reklamy w panelu adsense  
  baciata.pl/szukam-partnera-do-bachaty | Header Top */
}

import { useState } from "react";
import Script from "next/script";
import styles from "./AdBanner.module.css";

export default function AdBanner() {
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  return (
    <div className="w-full overflow-hidden">
      <div className={styles.adContainer}>
        {!isAdLoaded && (
          <div className={styles.adPlaceholder}>
            <div className="text-center p-4">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm mb-2">
                Reklama
              </span>
              <p className="text-gray-600 text-sm">Miejsce na Twoją reklamę</p>
            </div>
          </div>
        )}
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            minHeight: "90px",
          }}
          data-ad-client="ca-pub-8585871789466302"
          data-ad-slot="4423985845"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
      <Script
        id="adsbygoogle-init"
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
            try {
              (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (error) {
              console.error('AdSense error:', error);
            }
          `,
        }}
      />
    </div>
  );
}
