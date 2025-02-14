"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import {
  FaMusic,
  FaUsers,
  FaBook,
  FaCalendarAlt,
  FaGraduationCap,
  FaBell,
  FaEnvelope,
  FaSearch,
  FaCompass,
  FaArrowUp,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../store/slices/authSlice";
import { RootState } from "../store/slices/types";
import { useAuth } from "../hooks/useAuth";
import { UserMenu } from "./UserMenu";
import { NavbarSkeleton } from "./NavbarSkeleton";
import { useNavigation } from "@/hooks/useNavigation";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ScrollToTopButton } from "./ScrollToTopButton";

export const NavContent: React.FC = React.memo(function NavContent() {
  const {
    isMobileMenuOpen,
    handleMobileMenu,
    user,
    isAuthenticated,
    handleLogout,
  } = useNavigation();
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/szukam-partnera-do-bachaty",
      label: "Społeczność",
      icon: FaUsers,
      badge: "2137",
    },
    {
      href: "/nauka-tanca-bachata",
      label: "Nauka tańca",
      icon: FaCompass,
    },
    {
      href: "/muzyka",
      label: "Muzyka",
      icon: FaMusic,
    },
  ];

  return (
    <>
      <div className="h-16" aria-hidden="true" /> {/* Spacer */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <nav
          className="bg-white border-b border-gray-200 shadow-sm"
          role="navigation"
          aria-label="Menu główne"
        >
          <div className="max-w-[1920px] mx-auto">
            <div className="flex items-center justify-between h-16 px-4 lg:px-8">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-3 group"
                aria-label="Strona główna Baciata"
              >
                <div className="relative" aria-hidden="true">
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
                  <span className="text-gray-500 text-xs">Dance Community</span>
                </div>
              </Link>

              {/* Menu główne - desktop */}
              <div
                className="hidden md:flex items-center gap-1 flex-1 justify-center max-w-2xl"
                role="menubar"
                aria-label="Menu nawigacyjne"
              >
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all relative group 
                      ${
                        pathname === item.href
                          ? "text-amber-600 bg-amber-50"
                          : "text-gray-700 hover:bg-gray-50 hover:text-amber-600"
                      }`}
                    role="menuitem"
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    <span className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" aria-hidden="true" />
                      {item.label}
                      {item.badge && (
                        <span
                          className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full"
                          aria-label={`${item.badge} nowych`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </span>
                    {pathname === item.href && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* Przyciski logowania i menu użytkownika - desktop */}
              <div
                className="hidden md:flex items-center gap-3"
                role="navigation"
                aria-label="Menu użytkownika"
              >
                {isAuthenticated && user ? (
                  <div className="flex items-center gap-4">
                    <button
                      className="relative p-2 text-gray-500 hover:text-amber-600 transition-colors"
                      aria-label="Powiadomienia"
                    >
                      <FaBell className="w-5 h-5" aria-hidden="true" />
                      <span
                        className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"
                        aria-label="Nowe powiadomienia"
                      />
                    </button>

                    <button
                      className="relative p-2 text-gray-500 hover:text-amber-600 transition-colors"
                      aria-label="Wiadomości"
                    >
                      <FaEnvelope className="w-5 h-5" aria-hidden="true" />
                      <span
                        className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"
                        aria-label="Nowe wiadomości"
                      />
                    </button>

                    <UserMenu
                      user={{
                        name: user.name,
                        role: user.role,
                      }}
                      onLogout={handleLogout}
                    />
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
                      aria-label="Zaloguj się"
                    >
                      Zaloguj
                    </Link>
                    <Link
                      href="/register"
                      className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
                      aria-label="Zarejestruj się"
                    >
                      Dołącz do nas
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden relative w-10 h-10 text-gray-500 hover:text-gray-700 rounded-lg transition-colors focus:outline-none"
                onClick={handleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6" aria-hidden="true">
                    <span
                      className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                        isMobileMenuOpen
                          ? "rotate-45 translate-y-0"
                          : "-translate-y-2"
                      }`}
                    />
                    <span
                      className={`absolute h-0.5 w-6 bg-current transform transition-opacity duration-300 ease-in-out ${
                        isMobileMenuOpen ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <span
                      className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                        isMobileMenuOpen
                          ? "-rotate-45 translate-y-0"
                          : "translate-y-2"
                      }`}
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </nav>
      </div>
      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-black/50 z-[101] transition-opacity duration-300 md:hidden
          ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={handleMobileMenu}
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobilne"
      >
        <nav
          className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300
            ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
          role="navigation"
          aria-label="Menu mobilne"
        >
          <div className="p-4 space-y-4">
            {/* Menu mobilne */}
            <div className="space-y-2">
              {[
                // {
                //   href: "/szukam-partnera-do-bachaty",
                //   label: "Społeczność",
                //   icon: FaUsers,
                //   badge: "2137",
                // },
                {
                  href: "/nauka-tanca-bachata",
                  label: "Nauka tańca",
                  icon: FaCompass,
                },
                {
                  href: "/muzyka",
                  label: "Muzyka",
                  icon: FaMusic,
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-amber-50 text-amber-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Przyciski w menu mobilnym */}
            <div className="pt-4 border-t">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    href="/profile/edit"
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 font-medium">
                        {user?.name?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-xs text-gray-500">{user?.role}</div>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Wyloguj się
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    className="block w-full px-4 py-2 text-sm font-medium text-center text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Zaloguj się
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
                  >
                    Dołącz do nas
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      <ScrollToTopButton />
    </>
  );
});
