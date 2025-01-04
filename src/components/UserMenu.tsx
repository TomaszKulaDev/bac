import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { createPortal } from "react-dom";
import Image from "next/image";

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getMenuPosition = () => {
    if (!buttonRef.current) return { top: 0, right: 0 };
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: `${rect.bottom + 8}px`,
      right: `${window.innerWidth - rect.right}px`,
    };
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 
        transition-all duration-200 text-[15px] tracking-wide font-medium group"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Image
          src={user.image ?? "/images/default-avatar.png"}
          alt={user.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span>{user.name}</span>
        <FaCaretDown
          className={`w-4 h-4 transition-transform duration-200 
        ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed rounded-xl shadow-lg bg-white/95 backdrop-blur-sm
          ring-1 ring-white/20 overflow-hidden"
            style={{
              ...getMenuPosition(),
              zIndex: 9999,
              width: "220px",
            }}
          >
            <div className="py-1" role="menu">
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 
              hover:bg-gray-50 transition-colors duration-200"
              >
                <FaUser className="w-4 h-4 text-gray-400" />
                Twój profil
              </Link>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 
                hover:bg-gray-50 transition-colors duration-200"
                >
                  <FaUser className="w-4 h-4 text-gray-400" />
                  Panel Admina
                </Link>
              )}
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 
              hover:bg-red-50 transition-colors duration-200"
              >
                <FaUser className="w-4 h-4 text-red-400" />
                Wyloguj się
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
