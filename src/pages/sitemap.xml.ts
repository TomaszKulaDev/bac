import { GetServerSideProps } from "next";

function generateSiteMap(routes: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map((route) => {
          return `
            <url>
              <loc>${`https://www.baciata.pl${route}`}</loc>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const routes = [
    "/",
    "/login",
    "/register",
    // Dodaj tutaj więcej tras
  ];

  const sitemap = generateSiteMap(routes);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {
  // Komponent jest pusty, ponieważ sitemap jest generowany po stronie serwera
}
