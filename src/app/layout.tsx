"use client";

import Link from "next/link";
import "./globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { SessionProvider } from "next-auth/react";

function NavContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/users/login");
  };

  console.log("isLoggedIn:", isLoggedIn);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-2xl font-bold">
        <Link href="/">MyApp</Link>
      </div>
      <button
        className="lg:hidden block"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
      >
        ☰
      </button>
      <ul
        className={`lg:flex lg:space-x-4 p-4 bg-gray-800 text-white ${
          isMenuOpen ? "block" : "hidden"
        } lg:block`}
      >
        {isLoggedIn ? (
          <>
            <li>
              <Link href="/users/profile">Profil</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Wyloguj</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/users/login">Zaloguj</Link>
            </li>
            <li>
              <Link href="/users/register">Zarejestruj się</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <header>
              <NavContent />
            </header>
            <main>{children}</main>
          </body>
        </html>
      </AuthProvider>
    </SessionProvider>
  );
}
