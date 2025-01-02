"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AddAdvertisementButton } from "./AddAdvertisementButton";
import { toast } from "react-toastify";
import { Advertisement, AdvertisementType } from "@/types/advertisement";
import Modal from "@/components/ui/Modal";
import { AdvertisementForm } from "./AdvertisementForm";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

export function QuickAds() {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [selectedType, setSelectedType] = useState<
    AdvertisementType | "Wszystkie"
  >("Wszystkie");
  const [visibleAds, setVisibleAds] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchAds = async () => {
    try {
      const response = await fetch("/api/advertisements");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setAds(data);
    } catch (error) {
      toast.error("Nie udało się pobrać ogłoszeń");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć to ogłoszenie?")) return;

    try {
      const response = await fetch(`/api/advertisements/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast.success("Ogłoszenie zostało usunięte");
      fetchAds(); // Odśwież listę
    } catch (error) {
      toast.error("Nie udało się usunąć ogłoszenia");
    }
  };

  const filteredAds =
    selectedType === "Wszystkie"
      ? ads
      : ads.filter((ad) => ad.type === selectedType);

  const typeColors = {
    Praktis: "bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md",
    Social: "bg-green-100 text-green-600 px-2 py-0.5 rounded-md",
    Kurs: "bg-purple-100 text-purple-600 px-2 py-0.5 rounded-md",
    Inne: "bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md",
  } as const;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Szybkie Ogłoszenia
          </h2>
          <AddAdvertisementButton onSuccess={fetchAds} />
        </div>
        <div className="flex gap-2">
          {["Wszystkie", "Praktis", "Social", "Kurs", "Inne"].map((type) => (
            <button
              key={type}
              onClick={() =>
                setSelectedType(type as AdvertisementType | "Wszystkie")
              }
              className={`px-3 py-1.5 rounded-full text-sm ${
                selectedType === type
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 text-left text-sm font-medium text-gray-500">
                Typ
              </th>
              <th className="py-3 text-left text-sm font-medium text-gray-500">
                Tytuł
              </th>
              <th className="py-3 text-left text-sm font-medium text-gray-500">
                Data
              </th>
              <th className="py-3 text-left text-sm font-medium text-gray-500">
                Miejsce
              </th>
              <th className="py-3 text-left text-sm font-medium text-gray-500">
                Autor
              </th>
              <th className="py-3 text-right text-sm font-medium text-gray-500">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredAds.slice(0, visibleAds).map((ad) => (
              <tr key={ad._id} className="group hover:bg-gray-50">
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      typeColors[ad.type]
                    }`}
                  >
                    {ad.type}
                  </span>
                </td>
                <td className="py-3">
                  <Link
                    href={`/szukam-partnera-do-tanca/ogloszenie/${ad._id}`}
                    className="text-gray-900 hover:text-amber-500 font-medium"
                  >
                    {ad.title}
                  </Link>
                </td>
                <td className="py-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-amber-500" size={12} />
                    {ad.date}
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-amber-500" size={12} />
                    {ad.location.city}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    {ad.author.avatar ? (
                      <Image
                        src={ad.author.avatar}
                        alt={ad.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    ) : (
                      <div
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-red-500 
                                    flex items-center justify-center text-white text-xs"
                      >
                        {ad.author.name[0]?.toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm text-gray-600">
                      {ad.author.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/szukam-partnera-do-tanca/ogloszenie/${ad._id}`}
                      className="text-amber-600 hover:bg-amber-50 p-2 rounded-lg inline-flex items-center gap-1"
                    >
                      <span className="text-sm">Szczegóły</span>
                      <FaArrowRight size={12} />
                    </Link>
                    {session?.user?.name === ad.author.name && (
                      <>
                        <button
                          onClick={() => handleDelete(ad._id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-lg text-sm"
                        >
                          Usuń
                        </button>
                        <button
                          onClick={() => {
                            setEditingAd(ad);
                            setIsEditModalOpen(true);
                          }}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg text-sm"
                        >
                          Edytuj
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAds.length > visibleAds && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleAds((prev) => prev + 8)}
            className="px-6 py-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
          >
            Pokaż więcej ({filteredAds.length - visibleAds})
          </button>
        </div>
      )}

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingAd(null);
        }}
        title="Edytuj ogłoszenie"
      >
        {editingAd && (
          <AdvertisementForm
            mode="edit"
            initialData={editingAd}
            onSuccess={() => {
              setIsEditModalOpen(false);
              setEditingAd(null);
              fetchAds();
            }}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingAd(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
