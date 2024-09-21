import React from "react";
import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          <Link
            href="/admin/users"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Użytkownicy
          </Link>
          <Link
            href="/admin/events"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Wydarzenia
          </Link>
          <Link
            href="/admin/dance-schools"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Szkoły Tańca
          </Link>
          <Link
            href="/admin/statistics"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Statystyki
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
};

export default AdminLayout;