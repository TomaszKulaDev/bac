"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import {
  FaMusic,
  FaUsers,
  FaBook,
  FaCalendarAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../store/slices/authSlice";
import { RootState } from "../store/slices/types";
import { useAuth } from "../hooks/useAuth";
import { UserMenu } from "./UserMenu";
import { NavbarSkeleton } from "./NavbarSkeleton";
import { useNavigation } from "@/hooks/useNavigation";
import { useSession } from "next-auth/react";

export const NavContent: React.FC = React.memo(function NavContent() {
  const {
    isMobileMenuOpen,
    handleMobileMenu,
    user,
    isAuthenticated,
    handleLogout,
  } = useNavigation();
  const { data: session } = useSession();

  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <nav className="nav-container backdrop-blur-md bg-white/95 sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-all duration-300">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-lg shadow-sm flex items-center justify-center transform -rotate-12 group-hover:rotate-[-24deg] transition-all duration-300">
                  <span className="text-amber-600 text-xs font-bold">PL</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-lg leading-none">
                  BACIATA
                </span>
                <span className="text-gray-500 text-xs">dance community</span>
              </div>
            </Link>

            {/* Menu główne - desktop */}
            <div className="hidden md:flex items-center gap-1 flex-1 justify-center max-w-2xl">
              <Link
                href="/muzyka"
                className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-amber-600 transition-all relative group"
              >
                <span className="flex items-center gap-2">
                  <FaMusic className="w-4 h-4" />
                  Muzyka
                </span>
                <span className="absolute bottom-1 left-1/2 w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="/szukam-partnera-do-tanca"
                className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-amber-600 transition-all relative group"
              >
                <span className="flex items-center gap-2">
                  <FaUsers className="w-4 h-4" />
                  Szukam Partnera
                </span>
                <span className="absolute bottom-1 left-1/2 w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="/taneczne-historie"
                className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-amber-600 transition-all relative group"
              >
                <span className="flex items-center gap-2">
                  <FaBook className="w-4 h-4" />
                  Historie
                </span>
                <span className="absolute bottom-1 left-1/2 w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="/wydarzenia"
                className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-amber-600 transition-all relative group"
              >
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4" />
                  Wydarzenia
                </span>
                <span className="absolute bottom-1 left-1/2 w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="/szkoly"
                className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-amber-600 transition-all relative group"
              >
                <span className="flex items-center gap-2">
                  <FaGraduationCap className="w-4 h-4" />
                  Szkoły
                </span>
                <span className="absolute bottom-1 left-1/2 w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>

            {/* Przyciski logowania - desktop */}
            <div className="hidden md:flex items-center gap-2">
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
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
                  >
                    Zaloguj
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Dołącz do nas
                  </Link>
                </>
              )}
            </div>

            {/* Przycisk mobilny */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
      </nav>
    </Suspense>
  );
});
