import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Sprawdź czy to żądanie API
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next();

    // Ustaw nagłówki dla żądań API
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  }

  if (request.nextUrl.pathname.startsWith("/api/playlists")) {
    // Sprawdź sesję i przekieruj jeśli brak autoryzacji
  }
  //TODO --------------------------------- usunac po sylwestrze --------------------------------------
  // Data końca przekierowania
  const endDate = new Date("2025-07-07"); // przykładowa data
  const now = new Date();

  if (request.nextUrl.pathname === "/" && now < endDate) {
    return NextResponse.redirect(new URL("/nauka-tanca-bachata", request.url), {
      // Status 302 oznacza tymczasowe przekierowanie
      status: 302,
    });
  }
  //TODO --------------------------------- usunac po sylwestrze --------------------------------------
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/muzyka/:path*", "/admin/:path*", "/"],
};
