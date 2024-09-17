"use client";

import Link from "next/link";
import "./globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { SessionProvider } from "next-auth/react";
import { signOut } from "next-auth/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';

function NavContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    dispatch(logout());
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
        {isLoggedIn ? (
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AuthProvider>
            <SessionProvider>
              <NavContent />
              {children}
              <SpeedInsights />
            </SessionProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
