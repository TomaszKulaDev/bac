import { Suspense } from "react";
import { jsonLd } from "./page.metadata";
import Loading from "./loading";

export default function PartnerSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen flex flex-col">
        <Suspense fallback={<Loading />}>
          <main
            className="flex-grow"
            role="main"
            aria-label="Wyszukiwarka partnerów do tańca"
          >
            {children}
          </main>
        </Suspense>
      </div>
    </>
  );
}
