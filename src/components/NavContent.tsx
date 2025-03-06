"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaRegBell,
  FaRegEnvelope,
  FaRegUser,
  FaUserPlus,
} from "react-icons/fa";
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
      badge: "2137",
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
  ];

  return (
    <>
      <div
        className={`h-[${hasScrolled ? "75px" : "96px"}]`}
        aria-hidden="true"
      />
      <div className="fixed top-0 left-0 right-0 z-[100] bg-white">
        {/* Górny pasek z logo i przyciskami */}
        <div className="border-b border-gray-200">
          <div
            className={`max-w-[1300px] mx-auto px-4 flex items-center justify-between transition-all duration-200 ${
              hasScrolled ? "h-[75px]" : "h-[96px]"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <div
                  className={`rounded-full bg-[#FFCB04] transition-all duration-200 ${
                    hasScrolled ? "w-12 h-12" : "w-[56px] h-[56px]"
                  }`}
                />
                <span
                  className={`ml-3 transition-all duration-200 font-['Fira_Sans',Arial,Helvetica,sans-serif] ${
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

            {/* Przyciski po prawej */}
            <div className="flex items-center gap-5">
              {isAuthenticated ? (
                <>
                  <div className="relative">
                    <button
                      className={`flex items-center justify-center rounded-full bg-[#FFCB04] hover:bg-[#e6b700] transition-all duration-200 ${
                        hasScrolled ? "w-12 h-12" : "w-[56px] h-[56px]"
                      }`}
                    >
                      <FaRegBell
                        className={`text-gray-700 transition-all duration-200 ${
                          hasScrolled ? "w-7 h-7" : "w-8 h-8"
                        }`}
                      />
                      {notifications.alerts > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm rounded-full min-w-[22px] h-[22px] flex items-center justify-center px-1">
                          {notifications.alerts}
                        </span>
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <button
                      className={`flex items-center justify-center rounded-full bg-[#FFCB04] hover:bg-[#e6b700] transition-all duration-200 ${
                        hasScrolled ? "w-12 h-12" : "w-[56px] h-[56px]"
                      }`}
                    >
                      <FaRegEnvelope
                        className={`text-gray-700 transition-all duration-200 ${
                          hasScrolled ? "w-7 h-7" : "w-8 h-8"
                        }`}
                      />
                      {notifications.messages > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm rounded-full min-w-[22px] h-[22px] flex items-center justify-center px-1">
                          {notifications.messages}
                        </span>
                      )}
                    </button>
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
                    <div className="relative group">
                      <Link
                        href="/login"
                        className={`flex items-center justify-center rounded-full bg-[#FFCB04] hover:bg-[#e6b700] transition-all duration-200 ${
                          hasScrolled ? "w-12 h-12" : "w-[56px] h-[56px]"
                        }`}
                      >
                        <FaRegUser
                          className={`text-gray-700 transition-all duration-200 ${
                            hasScrolled ? "w-7 h-7" : "w-8 h-8"
                          }`}
                        />
                      </Link>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                        Zaloguj się
                      </div>
                    </div>
                    <div className="relative group">
                      <Link
                        href="/register"
                        className={`flex items-center justify-center rounded-full bg-[#FFCB04] hover:bg-[#e6b700] transition-all duration-200 ${
                          hasScrolled ? "w-12 h-12" : "w-[56px] h-[56px]"
                        }`}
                      >
                        <FaUserPlus
                          className={`text-gray-700 transition-all duration-200 ${
                            hasScrolled ? "w-7 h-7" : "w-8 h-8"
                          }`}
                        />
                      </Link>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                        Dołącz do nas
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dolny pasek z menu */}
        <div className="border-b border-gray-200 hidden lg:block">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="flex items-center h-10 gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-blue-600"
                      initial={false}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Menu mobilne */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[101] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={handleMobileMenu}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Menu</span>
                  <button
                    onClick={handleMobileMenu}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={handleMobileMenu}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
