import { GetServerSideProps } from "next";

// Funkcja generująca mapę strony w formacie XML
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

// Funkcja getServerSideProps generuje mapę strony po stronie serwera
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Lista tras do uwzględnienia w mapie strony
  const routes = [
    "/",
    "/login",
    "/register",
    "/muzyka",
    
    // Dodaj tutaj więcej tras
  ];

  // Generowanie mapy strony na podstawie tras
  const sitemap = generateSiteMap(routes);

  // Ustawienie nagłówka odpowiedzi na "text/xml"
  res.setHeader("Content-Type", "text/xml");
  // Zapisanie mapy strony do odpowiedzi
  res.write(sitemap);
  // Zakończenie odpowiedzi
  res.end();

  return {
    props: {},
  };
};

// Komponent Sitemap jest pusty, ponieważ mapa strony jest generowana po stronie serwera
export default function Sitemap() {
  // Komponent jest pusty, ponieważ sitemap jest generowany po stronie serwera
}
