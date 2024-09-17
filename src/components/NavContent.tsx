"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function NavContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

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
        {status === "authenticated" ? (
          <>
            <li>
              <Link href="/profile">Profil</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Wyloguj</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Zaloguj</Link>
            </li>
            <li>
              <Link href="/register">Zarejestruj się</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
