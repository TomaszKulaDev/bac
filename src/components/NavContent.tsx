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
      href: "/szukam-partnera-do-tanca",
      label: "Szukam Partnera",
      icon: FaUsers,
    },
    {
      href: "/instruktorzy-bachaty",
      label: "Instruktorzy Bachaty",
      icon: FaGraduationCap,
    },
    {
      href: "/muzyka",
      label: "Muzyka",
      icon: FaMusic,
      badge: "Nowe",
    },
  ];

  return (
    <>
      {/* Zmniejszony spacer dla nawigacji */}
      <div className="h-[88px]" /> {/* 24px (top bar) + 64px (main nav) */}
      {/* Nawigacja z cieńszym górnym paskiem */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        {/* Cieńszy górny pasek */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white h-6">
          <div className="max-w-[1200px] mx-auto px-4 h-full">
            <div className="flex items-center justify-between text-[11px] h-full">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="w-2.5 h-2.5" />
                  Najbliższe wydarzenie: Warsaw Salsa Festival (15.04)
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <FaUsers className="w-2.5 h-2.5" />
                  2137 tancerzy online
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/szukam-partnera-do-tanca/faq"
                  className="hover:underline"
                >
                  Pomoc
                </Link>
                <Link href="/kontakt" className="hover:underline">
                  Kontakt
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Główna nawigacja */}
        <div className="bg-white border-b border-gray-100 shadow-sm h-16">
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
                  <span className="text-gray-500 text-xs">Dance Community</span>
                </div>
              </Link>

              {/* Menu główne - desktop */}
              <div className="hidden md:flex items-center gap-1 flex-1 justify-center max-w-2xl">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all relative group 
                      ${
                        pathname === item.href
                          ? "text-amber-600 bg-amber-50"
                          : "text-gray-700 hover:bg-gray-100 hover:text-amber-600"
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.label}
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-amber-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </span>
                    <span
                      className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full transition-opacity
                        ${
                          pathname === item.href
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                    />
                  </Link>
                ))}
              </div>

              {/* Przyciski logowania i menu użytkownika - desktop */}
              <div className="hidden md:flex items-center gap-3">
                {isAuthenticated && user ? (
                  <div className="flex items-center gap-4">
                    {/* Powiadomienia */}
                    <button className="relative p-2 text-gray-500 hover:text-amber-600 transition-colors">
                      <FaBell className="w-5 h-5" />
                      <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    {/* Wiadomości */}
                    <button className="relative p-2 text-gray-500 hover:text-amber-600 transition-colors">
                      <FaEnvelope className="w-5 h-5" />
                      <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
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

              {/* Przycisk mobilny z animacją */}
              <button
                className="md:hidden relative w-10 h-10 text-gray-500 hover:text-gray-700 rounded-lg transition-colors focus:outline-none"
                onClick={handleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Menu"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6">
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
        </div>
      </div>
      {/* Menu mobilne z poprawionym z-index */}
      <div
        className={`fixed inset-0 bg-black/50 z-[101] transition-opacity duration-300 md:hidden
          ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={handleMobileMenu}
      >
        <div
          className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300
            ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 space-y-4">
            {/* Menu mobilne */}
            <div className="space-y-2">
              {[
                {
                  href: "/szukam-partnera-do-tanca",
                  label: "Szukam Partnera",
                  icon: FaUsers,
                },
                {
                  href: "/instruktorzy-bachaty",
                  label: "Instruktorzy Bachaty",
                  icon: FaGraduationCap,
                },
                {
                  href: "/muzyka",
                  label: "Muzyka",
                  icon: FaMusic,
                  badge: "Nowe",
                },
                {
                  href: "/taneczne-historie",
                  label: "Historie",
                  icon: FaBook,
                },
                {
                  href: "/wydarzenia",
                  label: "Wydarzenia",
                  icon: FaCalendarAlt,
                  badge: "3",
                },
                {
                  href: "/szkoly",
                  label: "Szkoły",
                  icon: FaGraduationCap,
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
                  {item.badge && (
                    <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-amber-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Przyciski w menu mobilnym */}
            <div className="pt-4 border-t">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    href="/profil"
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
        </div>
      </div>
    </>
  );
});
