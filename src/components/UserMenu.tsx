import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaUser, FaCog } from "react-icons/fa";
import { Tooltip } from "./ui/Tooltip";

interface UserMenuProps {
  user: {
    name: string;
    role?: string;
  };
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover:text-gray-300 transition duration-150 ease-in-out"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaUser />
        <span>{user.name}</span>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="py-1" role="menu">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              Zalogowany jako: {user.name}
            </div>

            {/* Menu dla wszystkich użytkowników */}
            <Link
              href="/profil"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Profil
            </Link>

            {/* Menu tylko dla administratorów */}
            {user.role === "admin" && (
              <>
                <Link
                  href="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <FaCog className="mr-2" />
                    Panel Admina
                  </div>
                </Link>
                <Link
                  href="/admin/users"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Zarządzaj Użytkownikami
                </Link>
                <Link
                  href="/admin/content"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Zarządzaj Treścią
                </Link>
              </>
            )}

            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
              role="menuitem"
            >
              Wyloguj
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
