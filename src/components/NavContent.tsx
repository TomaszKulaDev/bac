"use client";

import React, { useState, useEffect, Suspense } from "react";
// import { useRouter } from "next/navigation";
// import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../store/slices/authSlice";
import { RootState } from "../store/slices/types";
import { FaMusic, FaBars } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { UserMenu } from "./UserMenu";
import { NavbarSkeleton } from "./NavbarSkeleton";
import { useNavigation } from "@/hooks/useNavigation";

export const NavContent: React.FC = React.memo(function NavContent() {
  const {
    isMobileMenuOpen,
    handleMobileMenu,
    user,
    isAuthenticated,
    handleLogout,
  } = useNavigation();

  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <nav className="nav-container">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center py-4">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/" className="text-xl font-bold flex items-center">
                <FaMusic className="mr-2" />
                Baciata.pl
              </Link>
              <button
                className="md:hidden"
                onClick={handleMobileMenu}
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
                <UserMenu
                  user={{
                    name: user.name,
                    role: user.role,
                  }}
                  onLogout={handleLogout}
                />
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
    </Suspense>
  );
});
