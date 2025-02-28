"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { FaRegBell, FaRegEnvelope } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../store/slices/authSlice";
import { RootState } from "../store/slices/types";
import { useAuth } from "../hooks/useAuth";
import { UserMenu } from "./UserMenu";
import { NavbarSkeleton } from "./NavbarSkeleton";
import { useNavigation } from "@/hooks/useNavigation";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ScrollToTopButton from "./ScrollToTopButton";

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
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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

  // Animacje dla menu mobilnego
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Animacje dla tła menu mobilnego
  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <div className="h-16" aria-hidden="true" /> {/* Spacer */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <motion.nav
          className={`bg-white border-b transition-all duration-300 ${
            hasScrolled ? "border-gray-200 shadow-md" : "border-transparent"
          }`}
          role="navigation"
          aria-label="Menu główne"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-[1920px] mx-auto">
            <div
              className={`flex items-center justify-between h-16 px-4 lg:px-8 transition-all duration-300 ${
                hasScrolled ? "h-14" : "h-16"
              }`}
            >
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-3 group"
                aria-label="Strona główna Baciata"
              >
                <div className="relative" aria-hidden="true">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-all duration-300"
                    whileHover={{ rotate: 6, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white font-bold text-lg">B</span>
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-lg shadow-sm flex items-center justify-center transform -rotate-12 group-hover:rotate-[-24deg] transition-all duration-300"
                    whileHover={{ rotate: -24, scale: 1.1 }}
                  >
                    <span className="text-amber-600 text-xs font-bold">PL</span>
                  </motion.div>
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
                className="hidden md:flex items-center gap-8 flex-1 justify-center max-w-2xl"
                role="menubar"
                aria-label="Menu nawigacyjne"
              >
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-2 text-sm font-medium transition-all group 
                      ${
                        pathname === item.href
                          ? "text-amber-600"
                          : "text-gray-700 hover:text-amber-600"
                      }`}
                    role="menuitem"
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.badge && (
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full"
                          aria-label={`${item.badge} nowych`}
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </span>
                    {pathname === item.href ? (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
                        aria-hidden="true"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.2 }}
                      />
                    ) : (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
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
                    <motion.button
                      className="relative p-2 text-gray-500 hover:text-amber-600 transition-colors rounded-full hover:bg-amber-50"
                      aria-label={`Powiadomienia (${notifications.alerts} nowych)`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaRegBell className="w-5 h-5" aria-hidden="true" />
                      {notifications.alerts > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-0.5 right-0.5 flex items-center justify-center min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full px-1"
                          aria-label={`${notifications.alerts} nowych powiadomień`}
                        >
                          {notifications.alerts}
                        </motion.span>
                      )}
                    </motion.button>

                    <motion.button
                      className="relative p-2 text-gray-500 hover:text-amber-600 transition-colors rounded-full hover:bg-amber-50"
                      aria-label={`Wiadomości (${notifications.messages} nowych)`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaRegEnvelope className="w-5 h-5" aria-hidden="true" />
                      {notifications.messages > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-0.5 right-0.5 flex items-center justify-center min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full px-1"
                          aria-label={`${notifications.messages} nowych wiadomości`}
                        >
                          {notifications.messages}
                        </motion.span>
                      )}
                    </motion.button>

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
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="/register"
                        className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
                        aria-label="Zarejestruj się"
                      >
                        Dołącz do nas
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <motion.button
                className="md:hidden relative w-10 h-10 text-gray-500 hover:text-gray-700 rounded-lg transition-colors focus:outline-none"
                onClick={handleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
                whileTap={{ scale: 0.9 }}
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
              </motion.button>
            </div>
          </div>
        </motion.nav>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-backdrop"
            className="fixed inset-0 bg-black/50 z-[101] md:hidden"
            onClick={handleMobileMenu}
            role="dialog"
            aria-modal="true"
            aria-label="Menu mobilne"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
          >
            <motion.nav
              className="fixed inset-y-0 right-0 w-72 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
              role="navigation"
              aria-label="Menu mobilne"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="p-5 space-y-6">
                {/* Nagłówek menu mobilnego */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center transform rotate-3">
                      <span className="text-white font-bold text-lg">B</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-bold text-lg leading-none">
                        BACIATA
                      </span>
                      <span className="text-gray-500 text-xs">
                        Dance Community
                      </span>
                    </div>
                  </div>
                  <motion.button
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                    onClick={handleMobileMenu}
                    aria-label="Zamknij menu"
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* Menu mobilne */}
                <div className="space-y-1">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                          pathname === item.href
                            ? "text-amber-600 border-l-2 border-amber-500 pl-3"
                            : "text-gray-600 hover:bg-gray-50 hover:text-amber-600"
                        }`}
                        onClick={handleMobileMenu}
                      >
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Przyciski w menu mobilnym */}
                <div className="pt-4 border-t border-gray-100">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <Link
                        href="/profile/edit"
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={handleMobileMenu}
                      >
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-600 font-medium">
                            {user?.name?.[0]?.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{user?.name}</div>
                          <div className="text-xs text-gray-500">
                            {user?.role}
                          </div>
                        </div>
                      </Link>

                      <div className="flex gap-2">
                        <Link
                          href="/notifications"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={handleMobileMenu}
                        >
                          <span className="font-medium">Powiadomienia</span>
                          {notifications.alerts > 0 && (
                            <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                              {notifications.alerts}
                            </span>
                          )}
                        </Link>

                        <Link
                          href="/messages"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={handleMobileMenu}
                        >
                          <span className="font-medium">Wiadomości</span>
                          {notifications.messages > 0 && (
                            <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                              {notifications.messages}
                            </span>
                          )}
                        </Link>
                      </div>

                      <motion.button
                        onClick={() => {
                          handleLogout();
                          handleMobileMenu();
                        }}
                        className="w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        whileTap={{ scale: 0.95 }}
                      >
                        Wyloguj się
                      </motion.button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href="/login"
                          className="block w-full px-4 py-3 text-sm font-medium text-center text-gray-700 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={handleMobileMenu}
                        >
                          Zaloguj się
                        </Link>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href="/register"
                          className="block w-full px-4 py-3 text-sm font-medium text-center text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors shadow-sm"
                          onClick={handleMobileMenu}
                        >
                          Dołącz do nas
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Stopka menu mobilnego */}
                <div className="pt-6 mt-6 border-t border-gray-100">
                  <div className="flex justify-center space-x-4">
                    <a href="#" className="text-gray-400 hover:text-amber-500">
                      <span className="sr-only">Facebook</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-500">
                      <span className="sr-only">Instagram</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-500">
                      <span className="sr-only">YouTube</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
