"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { NAVIGATION_LINKS } from "./constants";

export function Header() {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Górny pasek */}
      <div className="bg-[#e90636] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-2xl">BACHATA</span>
              <span className="font-light text-2xl">news</span>
            </Link>

            <div className="flex items-center gap-4">
              <button className="px-4 py-1 text-sm border border-white rounded hover:bg-white hover:text-[#e90636] transition-colors">
                Wyślij news
              </button>
              <button className="px-4 py-1 text-sm bg-white text-[#e90636] rounded hover:bg-gray-100 transition-colors">
                Zaloguj
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu główne z megamenu */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex">
            {NAVIGATION_LINKS.map((link) => (
              <div
                key={link.href}
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(link.label)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-gray-700 hover:text-[#e90636] transition-colors"
                >
                  {link.label}
                </Link>

                {/* Megamenu */}
                {activeSubmenu === link.label && link.submenu && (
                  <div className="absolute left-0 w-[800px] p-6 bg-white shadow-xl rounded-b grid grid-cols-4 gap-8">
                    {/* Featured section */}
                    {link.submenu.featured && (
                      <div className="col-span-1">
                        <h3 className="font-semibold mb-4">
                          {link.submenu.featured.title}
                        </h3>
                        {link.submenu.featured.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block group"
                          >
                            {item.image && (
                              <div className="relative h-32 mb-2 overflow-hidden rounded">
                                <Image
                                  src={item.image}
                                  alt={item.label}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                            )}
                            <h4 className="font-medium text-gray-900 group-hover:text-[#e90636]">
                              {item.label}
                            </h4>
                            {item.description && (
                              <p className="text-sm text-gray-600 mt-1">
                                {item.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Categories */}
                    <div className="col-span-3 grid grid-cols-3 gap-8">
                      {link.submenu.categories.map((category, idx) => (
                        <div key={idx}>
                          <h3 className="font-semibold mb-3">
                            {category.title}
                          </h3>
                          <ul className="space-y-2">
                            {category.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className="text-gray-600 hover:text-[#e90636] transition-colors"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
