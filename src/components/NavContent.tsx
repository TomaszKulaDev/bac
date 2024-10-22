"use client";

import React from "react";
import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../store/slices/authSlice";
import { RootState } from "../store/slices/types";
import { FaMusic, FaBars } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { UserMenu } from "./UserMenu";

export const NavContent: React.FC = React.memo(function NavContent() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session, status, handleLogout, syncAuthState } = useAuth();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    syncAuthState();
  }, [syncAuthState]);

  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      if (status === "authenticated" && session?.user) {
        dispatch(
          login({
            user: {
              id: session.user.id || "",
              email: session.user.email || null,
              name: session.user.name || null,
              role: session.user.role || null,
            },
          })
        );
      } else if (status === "unauthenticated") {
        dispatch(logout());
      }
    }
  }, [status, session, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isDropdownOpen && !target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-16">Ładowanie...</div>
    );
  }

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" className="text-xl font-bold flex items-center">
              <FaMusic className="mr-2" />
              Baciata.pl
            </Link>
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Otwórz menu mobilne"
            >
              <FaBars />
            </button>
          </div>
          <div
            id="mobile-menu"
            className={`${
              isMobileMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row items-center w-full md:w-auto mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4`}
          >
            <Link
              href="/muzyka"
              className="hover:text-gray-300 transition duration-150 ease-in-out w-full md:w-auto text-center"
            >
              Muzyka
            </Link>
            <Link
              href="/taneczne-historie"
              className="hover:text-gray-300 transition duration-150 ease-in-out w-full md:w-auto text-center"
            >
              Wasze taneczne historie
            </Link>
            {isAuthenticated && user ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <>
                <Link
                  href="/login"
                  className="hover:text-gray-300 transition duration-150 ease-in-out w-full md:w-auto text-center"
                >
                  Zaloguj
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded transition duration-150 ease-in-out w-full md:w-auto text-center"
                >
                  Zarejestruj się
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});
