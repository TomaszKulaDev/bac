"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Advertisement {
  _id: string;
  title: string;
  description: string;
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
  date: string;
}

// Dodajemy funkcję pomocniczą do obliczania różnicy dni
const getDaysDifference = (eventDate: string) => {
  const today = new Date();
  const event = new Date(eventDate);
  const diffTime = event.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function AdminAnnouncementsPage() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await fetch("/api/advertisements");
      if (!response.ok) throw new Error("Błąd podczas pobierania ogłoszeń");
      const data = await response.json();
      setAdvertisements(data);
    } catch (error) {
      setError("Nie udało się pobrać ogłoszeń");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć to ogłoszenie?")) {
      return;
    }

    try {
      const response = await fetch(`/api/advertisements/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Błąd podczas usuwania ogłoszenia");
      }

      // Odśwież listę ogłoszeń
      await fetchAdvertisements();
      alert("Ogłoszenie zostało usunięte");
    } catch (error) {
      alert("Nie udało się usunąć ogłoszenia");
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Zarządzanie Ogłoszeniami</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tytuł
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Autor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data utworzenia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data wydarzenia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {advertisements.map((ad) => {
                const daysDiff = getDaysDifference(ad.date);
                const isExpired = daysDiff < 0;

                return (
                  <tr
                    key={ad._id}
                    className={`hover:bg-gray-50 ${
                      isExpired ? "bg-red-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {ad.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {ad.author.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {ad.author.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(ad.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {ad.date
                          ? new Date(ad.date).toLocaleDateString()
                          : "Nie określono"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-medium ${
                          isExpired ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {isExpired
                          ? `Przeterminowane (${Math.abs(daysDiff)} dni temu)`
                          : `Pozostało ${daysDiff} dni`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(ad._id)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Usuń
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
