"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { AddAdvertisementButton } from "./AddAdvertisementButton";
import Modal from "@/components/ui/Modal";
import { AdvertisementForm } from "./AdvertisementForm";
import type {
  Advertisement,
  AdvertisementType,
  DanceLevel,
} from "@/types/advertisement";
import { toast } from "react-toastify";
import { CITIES } from "@/constants/cities";

// Rozszerzamy typ Advertisement o pełne dane autora
interface ExtendedAuthor {
  id: string;
  email: string;
  name: string;
  image?: string;
  level: DanceLevel;
}

interface ExtendedAdvertisement extends Omit<Advertisement, "author"> {
  author: ExtendedAuthor;
}

export function QuickAds() {
  const [ads, setAds] = useState<ExtendedAdvertisement[]>([]);
  const [selectedType, setSelectedType] = useState<
    AdvertisementType | "Wszystkie"
  >("Wszystkie");
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const [editingAd, setEditingAd] = useState<ExtendedAdvertisement | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Pobieranie ogłoszeń z logowaniem
  const fetchAds = useCallback(async () => {
    try {
      const response = await fetch("/api/advertisements");
      const data = await response.json();

      console.log("Pierwsze ogłoszenie:", {
        id: data[0]?._id,
        title: data[0]?.title,
        author: {
          name: data[0]?.author?.name,
          email: data[0]?.author?.email,
        },
        sessionUser: {
          name: session?.user?.name,
          email: session?.user?.email,
        },
      });

      setAds(data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Nie udało się pobrać ogłoszeń");
    } finally {
      setIsLoading(false);
    }
  }, [session?.user]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  // Grupowanie i sortowanie ogłoszeń według miast
  const organizeAds = (ads: ExtendedAdvertisement[]) => {
    // 1. Grupujemy według miast
    const grouped = ads.reduce((acc, ad) => {
      const city = ad.location.city;
      if (!acc.has(city)) {
        acc.set(city, []);
      }
      acc.get(city)?.push(ad);
      return acc;
    }, new Map<string, ExtendedAdvertisement[]>());

    // 2. Sortujemy miasta według kolejności w CITIES
    return Array.from(grouped.entries()).sort(([cityA], [cityB]) => {
      const indexA = CITIES.findIndex((c) => c.value === cityA);
      const indexB = CITIES.findIndex((c) => c.value === cityB);
      if (indexA === -1 && indexB === -1) return cityA.localeCompare(cityB);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  };

  // Filtrowanie i organizacja ogłoszeń
  const filteredAds =
    selectedType === "Wszystkie"
      ? ads
      : ads.filter((ad) => ad.type === selectedType);

  const organizedAds = organizeAds(filteredAds);

  // Funkcja sprawdzająca czy użytkownik jest autorem
  const isAuthor = useCallback(
    (ad: ExtendedAdvertisement) => {
      console.log("Checking author:", {
        sessionEmail: session?.user?.email,
        adAuthorEmail: ad.author?.email,
        adAuthor: ad.author,
        isMatch: session?.user?.email === ad.author?.email,
      });

      return session?.user?.email === ad.author?.email;
    },
    [session?.user?.email]
  );

  // Funkcja usuwania ogłoszenia
  const handleDelete = async (adId: string, authorEmail: string) => {
    console.log("Delete attempt:", {
      sessionEmail: session?.user?.email,
      authorEmail,
      adId,
    });

    // Sprawdzamy czy użytkownik ma prawo usunąć ogłoszenie
    if (session?.user?.email !== authorEmail) {
      toast.error("Nie masz uprawnień do usunięcia tego ogłoszenia");
      return;
    }

    if (!confirm("Czy na pewno chcesz usunąć to ogłoszenie?")) return;

    try {
      const response = await fetch(`/api/advertisements/${adId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Delete response:", await response.text());
        throw new Error("Failed to delete");
      }

      toast.success("Ogłoszenie zostało usunięte");
      fetchAds();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Nie udało się usunąć ogłoszenia");
    }
  };

  // Dodajemy funkcję pomocniczą do porównywania dat
  const getDateDifference = (date: string) => {
    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    return Math.abs(eventDate.getTime() - today.getTime());
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      {/* Sekcja nagłówka */}
      <div className="mb-8 space-y-6">
        {/* Górny pasek */}
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 
                        border-b border-gray-100 pb-4"
        >
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Szybkie Ogłoszenia
            </h2>
            <span className="text-sm text-gray-500">Łącznie: {ads.length}</span>
          </div>
          <AddAdvertisementButton onSuccess={fetchAds} />
        </div>

        {/* Filtry i statystyki */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Filtry:</span>
            <div className="flex gap-2 flex-wrap">
              {["Wszystkie", "Praktis", "Social", "Kurs", "Inne"].map(
                (type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setSelectedType(type as AdvertisementType | "Wszystkie")
                    }
                    className={`px-3 py-1.5 rounded-full transition-all
                    ${
                      selectedType === type
                        ? "bg-amber-50 text-amber-600 ring-1 ring-amber-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {type}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lista miast */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
                    gap-x-8 gap-y-6 auto-rows-start"
      >
        {organizedAds.map(([city, cityAds]) => (
          <div key={city} className="space-y-4">
            {/* Nagłówek miasta */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt
                  className="w-3.5 h-3.5 text-amber-500 
                           group-hover:text-amber-600 transition-colors"
                />
                <span
                  className="text-gray-700 text-sm font-medium 
                           group-hover:text-amber-600 transition-colors"
                >
                  {city}
                </span>
              </div>
              <span className="text-amber-500/70 text-sm font-medium">
                ({cityAds.length})
              </span>
            </div>

            {/* Lista ogłoszeń */}
            <div className="pl-5 space-y-1.5">
              {cityAds
                .sort((a, b) => {
                  // Najpierw sortujemy po dacie wydarzenia
                  const diffA = getDateDifference(a.date);
                  const diffB = getDateDifference(b.date);

                  if (diffA === diffB) {
                    // Jeśli daty są takie same, sortujemy po dacie utworzenia (najnowsze pierwsze)
                    return (
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                    );
                  }

                  // Sortujemy po najbliższej dacie wydarzenia
                  return diffA - diffB;
                })
                .map((ad) => (
                  <div
                    key={ad._id}
                    className="group flex items-start justify-between gap-2"
                  >
                    <Link
                      href={`/szukam-partnera-do-tanca/ogloszenie/${ad._id}`}
                      className="flex-1 text-sm text-gray-600 hover:text-amber-600 
                               transition-colors line-clamp-2"
                    >
                      <span className="flex items-center gap-2">
                        <span>{ad.title}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(ad.date).toLocaleDateString("pl-PL")}
                        </span>
                      </span>
                    </Link>

                    {isAuthor(ad) && (
                      <div
                        className="flex items-center gap-2 opacity-0 group-hover:opacity-100 
                                    transition-opacity"
                      >
                        <button
                          onClick={() => {
                            setEditingAd(ad);
                            setIsEditModalOpen(true);
                          }}
                          className="p-1 text-gray-400 hover:text-amber-500 transition-colors"
                        >
                          <FaEdit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(ad._id, ad.author.email)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FaTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal edycji */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edytuj ogłoszenie"
      >
        {editingAd && (
          <AdvertisementForm
            initialData={editingAd}
            onSuccess={() => {
              setIsEditModalOpen(false);
              fetchAds();
            }}
            mode="edit"
          />
        )}
      </Modal>
    </div>
  );
}
