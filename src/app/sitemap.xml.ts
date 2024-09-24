import { NextResponse } from "next/server";

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

// Funkcja generująca mapę strony po stronie serwera
export async function GET() {
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
  const headers = new Headers();
  headers.set("Content-Type", "text/xml");

  // Zwrócenie odpowiedzi z mapą strony
  return new NextResponse(sitemap, { headers });
}

// Komponent Sitemap jest pusty, ponieważ mapa strony jest generowana po stronie serwera
export default function Sitemap() {
  // Komponent jest pusty, ponieważ sitemap jest generowany po stronie serwera
}
