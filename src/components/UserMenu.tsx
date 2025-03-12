"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface UserMenuProps {
  user: {
    name: string;
    role?: string;
    image?: string;
  };
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  // Efekt dla montowania komponentu (SSR)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Efekt dla obsługi kliknięcia poza menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Efekt dla obsługi klawisza Escape
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const getMenuPosition = () => {
    if (!buttonRef.current) return { top: 0, right: 0 };
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: `${rect.bottom + 8}px`,
      right: `${window.innerWidth - rect.right}px`,
    };
  };

  // Animacje dla menu
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeInOut",
      },
    },
  };

  // Animacje dla elementów menu
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
    exit: { opacity: 0, x: 10 },
  };

  // Grupy elementów menu
  const menuItems = [
    {
      group: "Profil",
      items: [
        {
          label: "Twój profil",
          href: "/profile",
        },
        {
          label: "Powiadomienia",
          href: "/notifications",
          badge: "5",
        },
        {
          label: "Wiadomości",
          href: "/messages",
          badge: "3",
        },
        {
          label: "Ustawienia",
          href: "/profile/edit/settings",
        },
      ],
    },
    {
      group: "Poland Bachata League",
      items: [
        {
          label: "Poland Bachata League",
          href: "/poland-bachata-league",
        },
        {
          label: "Mój Ranking",
          href: "/poland-bachata-league/ranking",
        },
        {
          label: "Wydarzenia Ligowe",
          href: "/poland-bachata-league/events",
        },
      ],
    },
  ];

  // Dodajemy menu administratora, jeśli użytkownik ma rolę admin
  const adminItems = {
    group: "Administracja",
    items: [
      {
        label: "Panel Admina",
        href: "/admin",
      },
      {
        label: "Zarządzanie użytkownikami",
        href: "/admin/users",
      },
    ],
  };

  // Dodajemy sekcję pomocy
  const helpItems = {
    group: "Pomoc",
    items: [
      {
        label: "Centrum pomocy",
        href: "/help",
      },
    ],
  };

  // Kompletna lista elementów menu
  const allMenuItems = [...menuItems];

  // Dodajemy sekcję administratora, jeśli użytkownik ma rolę admin
  if (user.role === "admin") {
    allMenuItems.push(adminItems);
  }

  // Dodajemy sekcję pomocy
  allMenuItems.push(helpItems);

  return (
    <>
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 
        transition-all duration-200 text-[15px] tracking-wide font-medium group
        p-1.5 rounded-md hover:bg-gray-50"
        aria-expanded={isOpen}
        aria-haspopup="true"
        whileTap={{ scale: 0.97 }}
      >
        <div className="relative">
          <Image
            src={user.image ?? "/images/default-avatar.png"}
            alt={user.name}
            width={32}
            height={32}
            className="rounded-full ring-2 ring-white"
          />
          <motion.div
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            aria-label="Status: online"
          />
        </div>
        <span className="hidden sm:inline">{user.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs ml-1"
        >
          ▼
        </motion.div>
      </motion.button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={menuRef}
                className="fixed rounded-md shadow-lg bg-white
              ring-1 ring-black/5 overflow-hidden z-[9999]"
                style={{
                  ...getMenuPosition(),
                  width: "260px",
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                {/* Nagłówek menu */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.image ?? "/images/default-avatar.png"}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.name}
                      </div>
                      {user.role && (
                        <div className="text-xs text-gray-500">{user.role}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Grupy elementów menu */}
                <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  {allMenuItems.map((group, groupIndex) => (
                    <div key={`group-${groupIndex}`} className="py-2 px-2">
                      <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {group.group}
                      </div>

                      {group.items.map((item, index) => (
                        <motion.div
                          key={`item-${groupIndex}-${index}`}
                          custom={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <Link
                            href={item.href}
                            className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 
                          hover:bg-gray-50 rounded-md transition-colors duration-200 my-0.5"
                            onClick={() => setIsOpen(false)}
                            role="menuitem"
                          >
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Przycisk wylogowania */}
                <motion.div
                  className="p-2 border-t border-gray-100"
                  variants={itemVariants}
                  custom={11}
                >
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center justify-center px-3 py-2 text-sm text-red-600 
                  hover:bg-red-50 rounded-md transition-colors duration-200"
                    role="menuitem"
                  >
                    Wyloguj się
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
