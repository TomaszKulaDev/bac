"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UserMenu } from "./UserMenu";
import { useNavigation } from "@/hooks/useNavigation";

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
  const [hasScrolled, setHasScrolled] = useState(false);
  const [notifications, setNotifications] = useState({
    messages: 3,
    alerts: 5,
  });

  // Efekt dla wykrywania przewijania strony
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      href: "/szukam-partnera-do-bachaty",
      label: "Społeczność",
    },
    {
      href: "/poland-bachata-league",
      label: "Polska Liga Bachaty",
    },
    {
      href: "/nauka-tanca-bachata",
      label: "Nauka tańca",
    },
    {
      href: "/muzyka",
      label: "Muzyka",
    },
    {
      href: "/praktyki",
      label: "Praktyki",
    },
    {
      href: "/historie-bachaty",
      label: "Historie",
    },
    {
      href: "/filmy-bachata",
      label: "Filmy",
    },
  ];

  // Total notification count for mobile badge
  const totalNotifications = notifications.messages + notifications.alerts;

  return (
    <>
      <div
        className={`h-[${hasScrolled ? "75px" : "96px"}] lg:h-[${
          hasScrolled ? "87px" : "108px"
        }]`}
        aria-hidden="true"
      />
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm">
        {/* Górny pasek z logo i przyciskami */}
        <div className="border-b border-gray-100">
          <div
            className={`max-w-[1300px] mx-auto px-4 flex items-center justify-between transition-all duration-200 ${
              hasScrolled ? "h-[75px]" : "h-[96px]"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="flex items-center">
                <div
                  className={`rounded-full bg-[#ffd200] transition-transform duration-200 group-hover:scale-105 ${
                    hasScrolled ? "w-12 h-12" : "w-[56px] h-[56px]"
                  }`}
                />
                <span
                  className={`ml-3 font-bold transition-all duration-200 font-['Fira_Sans',Arial,Helvetica,sans-serif] ${
                    hasScrolled ? "text-[30px]" : "text-[38px]"
                  }`}
                  style={{
                    letterSpacing: "normal",
                    textAlign: "start",
                    lineHeight: "normal",
                  }}
                >
                  Baciata
                </span>
              </div>
            </Link>

            {/* Mobile menu toggle button */}
            <button
              onClick={handleMobileMenu}
              className="lg:hidden flex items-center justify-center px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
              aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? "Zamknij" : "Menu"}
              {totalNotifications > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {totalNotifications}
                </span>
              )}
            </button>

            {/* Przyciski po prawej - desktop */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <div className="relative group">
                    <button
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                      aria-label={`Powiadomienia (${notifications.alerts})`}
                    >
                      Powiadomienia
                      {notifications.alerts > 0 && (
                        <span className="ml-1.5 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] inline-flex items-center justify-center px-1">
                          {notifications.alerts}
                        </span>
                      )}
                    </button>
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <div className="p-3 border-b border-gray-100">
                        <h3 className="font-medium text-gray-900">
                          Powiadomienia
                        </h3>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {/* Placeholder for notifications */}
                        <div className="p-3 hover:bg-gray-50 border-b border-gray-100 transition-colors">
                          <p className="text-sm text-gray-700">
                            Nowa wiadomość od użytkownika
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            2 godziny temu
                          </p>
                        </div>
                        <div className="p-3 hover:bg-gray-50 transition-colors">
                          <p className="text-sm text-gray-700">
                            Zaproszenie na praktykę taneczną
                          </p>
                          <p className="text-xs text-gray-500 mt-1">wczoraj</p>
                        </div>
                      </div>
                      <div className="p-2 border-t border-gray-100">
                        <Link
                          href="/notifications"
                          className="block w-full text-center text-sm text-[#ffd200] hover:text-amber-600 py-1.5 transition-colors"
                        >
                          Zobacz wszystkie
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <button
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                      aria-label={`Wiadomości (${notifications.messages})`}
                    >
                      Wiadomości
                      {notifications.messages > 0 && (
                        <span className="ml-1.5 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] inline-flex items-center justify-center px-1">
                          {notifications.messages}
                        </span>
                      )}
                    </button>
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <div className="p-3 border-b border-gray-100">
                        <h3 className="font-medium text-gray-900">
                          Wiadomości
                        </h3>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {/* Placeholder for messages */}
                        <div className="p-3 hover:bg-gray-50 border-b border-gray-100 transition-colors">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Anna Kowalska
                              </p>
                              <p className="text-xs text-gray-500 truncate w-44">
                                Cześć, kiedy następna praktyka?
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Jan Nowak
                              </p>
                              <p className="text-xs text-gray-500 truncate w-44">
                                Dziękuję za lekcję!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 border-t border-gray-100">
                        <Link
                          href="/messages"
                          className="block w-full text-center text-sm text-[#ffd200] hover:text-amber-600 py-1.5 transition-colors"
                        >
                          Zobacz wszystkie
                        </Link>
                      </div>
                    </div>
                  </div>
                  <UserMenu
                    user={{
                      name: user?.name || "Użytkownik",
                      role: user?.role,
                    }}
                    onLogout={handleLogout}
                  />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/login"
                      className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Zaloguj się
                    </Link>
                    <Link
                      href="/register"
                      className="px-4 py-2 text-sm font-medium text-gray-800 bg-[#ffd200] rounded-md hover:bg-[#ffd200]/80 transition-colors"
                    >
                      Dołącz do nas
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dolny pasek z menu - desktop */}
        <div className="border-b border-gray-100 hidden lg:block">
          <div className="max-w-[1300px] mx-auto px-4">
            <nav className="flex items-center justify-between h-12">
              <div className="flex items-center space-x-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-md h-full flex items-center text-sm font-medium transition-all ${
                      pathname === item.href
                        ? "text-[#ffd200]"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    {pathname === item.href && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffd200]"
                        initial={false}
                      />
                    )}
                  </Link>
                ))}
              </div>
              <div className="hidden xl:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Szukaj..."
                    className="w-64 h-8 pl-3 pr-8 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-300 focus:border-amber-300"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">
                    Szukaj
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Menu mobilne - enhanced */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[101] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleMobileMenu}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Mobile menu header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <span className="font-bold text-gray-900 text-lg">Menu</span>
                <button
                  onClick={handleMobileMenu}
                  className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  aria-label="Zamknij menu"
                >
                  Zamknij
                </button>
              </div>

              {/* Search bar in mobile menu */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Szukaj..."
                    className="w-full h-10 pl-3 pr-10 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-300 focus:border-amber-300"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">
                    Szukaj
                  </button>
                </div>
              </div>

              {/* User section in mobile menu */}
              {isAuthenticated ? (
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {user?.name || "Użytkownik"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user?.role || "Użytkownik"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Link
                      href="/notifications"
                      className="flex-1 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors text-center"
                    >
                      Powiadomienia{" "}
                      {notifications.alerts > 0 && `(${notifications.alerts})`}
                    </Link>
                    <Link
                      href="/messages"
                      className="flex-1 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors text-center"
                    >
                      Wiadomości{" "}
                      {notifications.messages > 0 &&
                        `(${notifications.messages})`}
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="p-4 border-b border-gray-100">
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/login"
                      className="w-full py-2.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center"
                    >
                      Zaloguj się
                    </Link>
                    <Link
                      href="/register"
                      className="w-full py-2.5 bg-[#ffd200] rounded-md text-sm font-medium text-gray-800 hover:bg-[#ffd200]/80 transition-colors text-center"
                    >
                      Dołącz do nas
                    </Link>
                  </div>
                </div>
              )}

              {/* Navigation links */}
              <div className="flex-1 overflow-y-auto">
                <div className="py-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-3 transition-colors ${
                        pathname === item.href
                          ? "text-[#ffd200]"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={handleMobileMenu}
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="text-gray-400 text-sm">›</span>
                    </Link>
                  ))}
                </div>

                {/* User account section in mobile menu */}
                {isAuthenticated && (
                  <>
                    <div className="px-4 py-2 mt-2">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Twoje konto
                      </div>
                    </div>
                    <div>
                      <Link
                        href="/profile"
                        className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        onClick={handleMobileMenu}
                      >
                        <span className="font-medium">Twój profil</span>
                        <span className="text-gray-400 text-sm">›</span>
                      </Link>
                      <Link
                        href="/profile/edit/settings"
                        className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        onClick={handleMobileMenu}
                      >
                        <span className="font-medium">Ustawienia</span>
                        <span className="text-gray-400 text-sm">›</span>
                      </Link>
                    </div>

                    {/* Admin section in mobile menu - only for admins */}
                    {user?.role === "admin" && (
                      <>
                        <div className="px-4 py-2 mt-2">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Administracja
                          </div>
                        </div>
                        <div>
                          <Link
                            href="/admin"
                            className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            onClick={handleMobileMenu}
                          >
                            <span className="font-medium">Panel Admina</span>
                            <span className="text-gray-400 text-sm">›</span>
                          </Link>
                          <Link
                            href="/admin/users"
                            className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            onClick={handleMobileMenu}
                          >
                            <span className="font-medium">
                              Zarządzanie użytkownikami
                            </span>
                            <span className="text-gray-400 text-sm">›</span>
                          </Link>
                        </div>
                      </>
                    )}

                    {/* Help section in mobile menu */}
                    <div className="px-4 py-2 mt-2">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pomoc
                      </div>
                    </div>
                    <div>
                      <Link
                        href="/help"
                        className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        onClick={handleMobileMenu}
                      >
                        <span className="font-medium">Centrum pomocy</span>
                        <span className="text-gray-400 text-sm">›</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>

              {/* Footer for mobile menu */}
              {isAuthenticated && (
                <div className="p-4 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full py-2.5 bg-gray-100 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    Wyloguj się
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
