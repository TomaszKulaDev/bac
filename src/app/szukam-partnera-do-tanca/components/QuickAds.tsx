"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
import Link from "next/link";

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

  const handleEdit = (ad: Advertisement) => {
    setEditingAd(ad);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setEditingAd(null);
    fetchAds(); // Odśwież listę ogłoszeń
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <section className="p-8">
        <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Szybkie Ogłoszenia
              </h2>
              <p className="text-gray-600">
                Znaleziono {filteredAds.length} ogłoszeń
              </p>
            </div>
            <AddAdvertisementButton onSuccess={fetchAds} />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center sm:justify-end">
            {["Wszystkie", "Praktis", "Social", "Kurs", "Inne"].map((type) => (
              <button
                key={type}
                onClick={() =>
                  setSelectedType(type as AdvertisementType | "Wszystkie")
                }
                className={`px-3 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap
                  ${
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAds.slice(0, visibleAds).map((ad) => (
            <div
              key={ad._id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 relative"
            >
              <h3 className="text-lg font-semibold text-[#1f2937] mb-3 hover:text-amber-500 transition-colors">
                {ad.title}
              </h3>

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <FaCalendarAlt className="text-amber-500" />
                {ad.date}
                <span className="text-gray-400 mx-1">•</span>
                <div className="flex items-center gap-2">
                  <FaClock size={16} className="text-amber-500" />
                  {ad.time}
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                <FaMapMarkerAlt className="text-amber-500" />
                {ad.location.city} • {ad.location.place}
              </div>

              <div className="flex items-center justify-between">
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
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 text-xs">
                        {ad.author.name[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-800">{ad.author.name}</p>
                    <p className="text-xs text-gray-500">{ad.author.level}</p>
                  </div>
                </div>

                <Link
                  href={`/szukam-partnera-do-tanca/ogloszenie/${ad._id}`}
                  className="px-3 py-1.5 text-sm text-amber-600 hover:bg-amber-50 
                             rounded transition-colors inline-flex items-center gap-1"
                >
                  Szczegóły
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>

              {session?.user?.name === ad.author.name && (
                <div
                  className="mt-4 pt-4 border-t border-gray-100 
                             hidden group-hover:block transition-all"
                >
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 
                               rounded transition-colors"
                    >
                      Usuń
                    </button>
                    <button
                      onClick={() => handleEdit(ad)}
                      className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 
                               rounded transition-colors"
                    >
                      Edytuj
                    </button>
                  </div>
                </div>
              )}

              <div className="absolute top-3 right-3">
                <span className={`text-sm font-medium ${typeColors[ad.type]}`}>
                  {ad.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredAds.length > visibleAds && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleAds((prev) => prev + 8)}
              className="px-6 py-2 bg-white border border-gray-300 rounded-lg 
                       text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Pokaż więcej ogłoszeń ({filteredAds.length - visibleAds})
            </button>
          </div>
        )}
      </section>

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
            onSuccess={handleEditSuccess}
          />
        )}
      </Modal>
    </div>
  );
}
