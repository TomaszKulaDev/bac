import { jsonLd } from "./page.metadata";

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
        <main className="flex-grow">{children}</main>
        {/* ... reszta layoutu ... */}
      </div>
    </>
  );
}
