"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { FaMusic } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../store/slices/authSlice";
import { RootState } from "../store/slices/types";
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

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".nav-container");
      if (navbar) {
        if (window.scrollY > 0) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <nav className="nav-container sticky top-0 z-50 bg-[#1a1a1a] font-['Roboto_Condensed'] border-b border-gray-800">
        {/* Górny pasek z logo i przyciskami logowania */}
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-1 hover:opacity-90 transition-opacity"
            >
              <FaMusic className="text-red-600 text-2xl" />
              <span className="text-2xl font-bold tracking-tight text-red-600">
                BACHATA
              </span>
              <span className="text-2xl font-light tracking-tight text-white">
                .pl
              </span>
            </Link>

            {/* Przyciski logowania/rejestracji - widoczne tylko na desktop */}
            <div className="hidden md:flex items-center gap-4">
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
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    Zaloguj
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Dołącz do nas
                  </Link>
                </>
              )}
            </div>

            {/* Przycisk mobilny */}
            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors"
              onClick={handleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Główne menu nawigacyjne */}
        <div className="border-t border-gray-800 bg-[#1a1a1a]">
          <div className="container mx-auto px-4">
            <div className="hidden md:flex h-12 items-center space-x-8">
              <Link
                href="/muzyka"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Muzyka
              </Link>
              <Link
                href="/taneczne-historie"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Taneczne historie
              </Link>
              <Link
                href="/wydarzenia"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Wydarzenia
              </Link>
              <Link
                href="/szkoly"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Szkoły tańca
              </Link>
            </div>
          </div>
        </div>

        {/* Menu mobilne */}
        <div
          id="mobile-menu"
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden border-t border-gray-800`}
        >
          <div className="px-4 py-3 space-y-3">
            <Link
              href="/muzyka"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Muzyka
            </Link>
            <Link
              href="/taneczne-historie"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Taneczne historie
            </Link>
            <Link
              href="/wydarzenia"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Wydarzenia
            </Link>
            <Link
              href="/szkoly"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Szkoły tańca
            </Link>

            {/* Przyciski logowania w menu mobilnym */}
            {!isAuthenticated && (
              <div className="pt-4 border-t border-gray-800 space-y-3">
                <Link
                  href="/login"
                  className="block text-center py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Zaloguj
                </Link>
                <Link
                  href="/register"
                  className="block text-center py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Dołącz do nas
                </Link>
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          .nav-container.scrolled {
            background-color: rgba(26, 26, 26, 0.95);
            backdrop-filter: blur(8px);
          }
        `}</style>
      </nav>
    </Suspense>
  );
});
