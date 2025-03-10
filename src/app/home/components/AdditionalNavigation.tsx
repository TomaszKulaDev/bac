import React from "react";
import Link from "next/link";
import {
  FaUsers,
  FaTrophy,
  FaGraduationCap,
  FaMusic,
  FaBook,
  FaVideo,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    href: "/szukam-partnera-do-bachaty",
    label: "Społeczność",
    icon: FaUsers,
  },
  {
    href: "/poland-bachata-league",
    label: "Polska Liga Bachaty",
    icon: FaTrophy,
  },
  {
    href: "/nauka-tanca-bachata",
    label: "Nauka tańca",
    icon: FaGraduationCap,
  },
  {
    href: "/muzyka",
    label: "Muzyka",
    icon: FaMusic,
  },
  {
    href: "/historie-bachaty",
    label: "Historie",
    icon: FaBook,
  },
  {
    href: "/filmy-bachata",
    label: "Filmy",
    icon: FaVideo,
  },
];

export const AdditionalNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="max-w-[1300px] mx-auto px-4">
      <div className="flex items-center justify-center gap-8 flex-wrap border-b border-gray-100 py-6">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center group transition-all duration-200 relative"
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full 
                  ${
                    isActive
                      ? "bg-[#ffd200] shadow-md"
                      : "bg-gray-50 group-hover:bg-[#ffd200]/10"
                  } 
                  transition-all duration-200 transform group-hover:scale-105`}
              >
                <item.icon
                  className={`w-5 h-5 
                    ${
                      isActive
                        ? "text-gray-800"
                        : "text-gray-600 group-hover:text-gray-800"
                    } 
                    transition-colors duration-200`}
                />
              </div>
              <span
                className={`mt-2 text-sm font-medium 
                  ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-600 group-hover:text-gray-800"
                  } 
                  transition-colors duration-200`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-[25px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#ffd200] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default AdditionalNavigation;
