import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
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

  // Sprawdź autoryzację dla chronionej ścieżki
  if (request.nextUrl.pathname.startsWith("/tancerki-tancerze-bachaty")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Jeśli użytkownik nie jest zalogowany, przekieruj do strony logowania
    if (!token) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", request.nextUrl.pathname);
      url.searchParams.set(
        "message",
        "Musisz być zalogowany, aby zobaczyć profile tancerzy"
      );
      return NextResponse.redirect(url);
    }
  }

  if (request.nextUrl.pathname.startsWith("/api/playlists")) {
    // Sprawdź sesję i przekieruj jeśli brak autoryzacji
  }
  //TODO --------------------------------- usunac po sylwestrze --------------------------------------
  // Data końca przekierowania
  const endDate = new Date("2025-01-07"); // przykładowa data
  const now = new Date();

  if (request.nextUrl.pathname === "/" && now < endDate) {
    return NextResponse.redirect(
      new URL("/szukam-partnera-do-tanca", request.url),
      {
        // Status 302 oznacza tymczasowe przekierowanie
        status: 302,
      }
    );
  }
  //TODO --------------------------------- usunac po sylwestrze --------------------------------------
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/muzyka/:path*",
    "/admin/:path*",
    "/",
    "/tancerki-tancerze-bachaty",
  ],
};
