"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { AddAdvertisementButton } from "./AddAdvertisementButton";
import Modal from "@/components/ui/Modal";
import { AdvertisementForm } from "./AdvertisementForm";
import type { Advertisement, AdvertisementType } from "@/types/advertisement";
import { toast } from "react-toastify";

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
      {/* Nagłówek z filtrami */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Szybkie Ogłoszenia
          </h2>
          <AddAdvertisementButton onSuccess={fetchAds} />
        </div>

        {/* Filtry z delikatnie zmodyfikowaną stylizacją dla mobile */}
        <div className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <div className="flex gap-2 min-w-max">
            {["Wszystkie", "Praktis", "Social", "Kurs", "Inne"].map((type) => (
              <button
                key={type}
                onClick={() =>
                  setSelectedType(type as AdvertisementType | "Wszystkie")
                }
                className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-all relative group
                  ${
                    selectedType === type
                      ? "text-amber-600 bg-amber-50"
                      : "text-gray-600 hover:bg-gray-50 hover:text-amber-600"
                  }`}
              >
                {type}
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 
                  bg-amber-500 rounded-full transition-opacity
                  ${
                    selectedType === type
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabela desktop z poprawioną stylizacją */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
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
                    className={`text-sm font-medium ${typeColors[ad.type]}`}
                  >
                    {ad.type}
                  </span>
                </td>
                <td className="py-3">
                  <Link
                    href={`/szukam-partnera-do-tanca/ogloszenie/${ad._id}`}
                    className="text-gray-600 hover:text-amber-600 text-sm transition-colors"
                  >
                    {ad.title}
                  </Link>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendarAlt className="text-amber-500" size={12} />
                    {ad.date}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaMapMarkerAlt className="text-amber-500" size={12} />
                    {ad.location.city}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center">
                      <Image
                        src={ad.author.image || "/images/default-avatar.png"}
                        alt={ad.author.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {ad.author.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/szukam-partnera-do-tanca/ogloszenie/${ad._id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-amber-600 
                        hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <span>Szczegóły</span>
                      <FaArrowRight size={12} />
                    </Link>
                    {session?.user?.name === ad.author.name && (
                      <>
                        <button
                          onClick={() => handleDelete(ad._id)}
                          className="px-3 py-1.5 text-sm font-medium text-red-600 
                            hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Usuń
                        </button>
                        <button
                          onClick={() => {
                            setEditingAd(ad);
                            setIsEditModalOpen(true);
                          }}
                          className="px-3 py-1.5 text-sm font-medium text-blue-600 
                            hover:bg-blue-50 rounded-lg transition-colors"
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

      {/* Karty mobilne z nową stylizacją */}
      <div className="md:hidden space-y-4">
        {filteredAds.slice(0, visibleAds).map((ad) => (
          <div
            key={ad._id}
            className="bg-white border border-gray-100 rounded-xl p-4 hover:border-amber-200 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <span className={`text-sm font-medium ${typeColors[ad.type]}`}>
                {ad.type}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Image
                    src={ad.author.image || "/images/default-avatar.png"}
                    alt={ad.author.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                </div>
                <span className="text-sm text-gray-600">{ad.author.name}</span>
              </div>
            </div>

            <h3 className="font-medium text-gray-900 mb-2">{ad.title}</h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaCalendarAlt className="text-amber-500" size={12} />
                {ad.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaClock className="text-amber-500" size={12} />
                {ad.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-amber-500" size={12} />
                {ad.location.city}, {ad.location.place}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t">
              <Link
                href={`/szukam-partnera-do-tanca/ogloszenie/${ad._id}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium 
                  text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              >
                <span>Szczegóły</span>
                <FaArrowRight size={12} />
              </Link>
              {session?.user?.name === ad.author.name && (
                <>
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="px-3 py-1.5 text-sm font-medium text-red-600 
                      hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Usuń
                  </button>
                  <button
                    onClick={() => {
                      setEditingAd(ad);
                      setIsEditModalOpen(true);
                    }}
                    className="px-3 py-1.5 text-sm font-medium text-blue-600 
                      hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Edytuj
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Przycisk "Pokaż więcej" */}
      {filteredAds.length > visibleAds && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleAds((prev) => prev + 8)}
            className="px-6 py-2 text-sm font-medium text-amber-600 
              hover:bg-amber-50 rounded-lg transition-colors"
          >
            Pokaż więcej ({filteredAds.length - visibleAds})
          </button>
        </div>
      )}

      {/* Modal edycji */}
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
