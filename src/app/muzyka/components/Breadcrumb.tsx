"use client";
import Link from 'next/link';

export default function Breadcrumb() {
  return (
    <nav
      aria-label="Ścieżka nawigacji"
      className="bg-[#0c0c0c] border-b border-zinc-800"
    >
      <div className="container mx-auto">
        <ol className="flex items-center h-[20px] px-4 text-[10px]">
          <li>
            <Link
              href="/"
              className="text-zinc-500 hover:text-white transition-colors duration-200"
            >
              Strona główna
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2 text-zinc-600">/</span>
            <span 
              aria-current="page" 
              className="text-zinc-400"
            >
              Muzyka
            </span>
          </li>
        </ol>
      </div>
    </nav>
  );
}
