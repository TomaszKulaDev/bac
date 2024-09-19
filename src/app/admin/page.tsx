"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function AdminPanel() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    console.log("AdminPanel useEffect - user:", user);
    console.log("AdminPanel useEffect - user role:", user?.role);
    if (!user || user.role !== "admin") {
      console.log("Redirecting to login - no user or not admin");
      router.push("/login");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Panel Administracyjny</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdminCard title="Zarządzanie Użytkownikami" link="/admin/users" />
          <AdminCard title="Zarządzanie Wydarzeniami" link="/admin/events" />
          <AdminCard
            title="Zarządzanie Szkołami Tańca"
            link="/admin/dance-schools"
          />
          <AdminCard title="Statystyki" link="/admin/statistics" />
        </div>
      </div>
    </div>
  );
}

function AdminCard({ title, link }: { title: string; link: string }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <a href={link} className="text-blue-500 hover:underline">
        Przejdź
      </a>
    </div>
  );
}
