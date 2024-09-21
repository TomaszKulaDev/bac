"use client";

import { useEffect } from "react";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Baciata.pl",
      url: "https://www.baciata.pl",
      description: "Platforma dla miłośników bachaty w Polsce",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.baciata.pl/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <>{children}</>;
}
