"use client";

import Script from "next/script";
import { useState } from "react";
import styles from "./AdBanner.module.css";

export default function AdBanner() {
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  return (
    <>
      <div className="w-full mb-6 overflow-hidden">
        <div className={styles.adContainer}>
          {!isAdLoaded && (
            <div className={styles.adPlaceholder}>Miejsce na Twoją reklamę</div>
          )}
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-TWÓJ-ID"
            data-ad-slot="TWÓJ-SLOT"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>

      {/* Google AdSense Scripts */}
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-TWÓJ-ID"
        onLoad={() => setIsAdLoaded(true)}
      />
      <Script
        id="adsbygoogle-init-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({});
          `,
        }}
      />
    </>
  );
}
