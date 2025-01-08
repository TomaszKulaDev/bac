"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  FaBell,
  FaBellSlash,
  FaHeart,
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
import { generateSlug } from "@/utils/slug";
import { shortenId } from "@/utils/shortId";

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

// Komponent reklamowy
const CityAdCard = () => (
  <div className="bg-white rounded-xl p-4 border-2 border-amber-100 hover:border-amber-200 transition-all">
    {/* Nagłówek */}
    <div className="flex items-center gap-2 mb-3">
      <div className="bg-amber-100 p-2 rounded-lg">
        <FaHeart className="w-4 h-4 text-amber-500" />
      </div>
      <h3 className="font-medium text-gray-900">Dołącz do społeczności</h3>
    </div>

    {/* Treść */}
    <p className="text-sm text-gray-600 mb-4">
      Stwórz profil i znajdź partnera do tańca w Twojej okolicy!
    </p>

    {/* Przycisk */}
    <Link
      href="/register"
      className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 
                hover:text-amber-700 group"
    >
      Stwórz profil
      <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

// Nowy komponent reklamowy z gradientem
const AdCard = () => (
  <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4 relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent animate-pulse-slow" />

    {/* Treść reklamy */}
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-amber-500/10 p-1.5 rounded-lg">
          <FaHeart className="w-4 h-4 text-amber-500" />
        </div>
        <h3 className="font-medium text-amber-900">Szukasz Partnera?</h3>
      </div>

      <p className="text-sm text-amber-800/80 mb-4">
        Dodaj swój profil i znajdź idealnego partnera do tańca w Twojej okolicy!
      </p>

      <Link
        href="/register"
        className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 
                 hover:text-amber-700 transition-colors group-hover:gap-3"
      >
        Stwórz profil
        <FaArrowRight className="w-3.5 h-3.5 transition-all" />
      </Link>
    </div>
  </div>
);

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
  const [subscribedCities, setSubscribedCities] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("subscribedCities");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Pobieranie ogłoszeń
  const fetchAds = useCallback(async () => {
    try {
      const response = await fetch("/api/advertisements");
      const data = await response.json();
      setAds(data);
    } catch (error) {
      toast.error("Nie udało się pobrać ogłoszeń");
    } finally {
      setIsLoading(false);
    }
  }, []);

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

    // 2. Sortujemy miasta według liczby ogłoszeń (malejąco)
    return Array.from(grouped.entries()).sort(
      ([cityA, adsA], [cityB, adsB]) => {
        // Najpierw sortujemy po liczbie ogłoszeń
        const countDiff = adsB.length - adsA.length;

        // Jeśli liczba ogłoszeń jest taka sama, sortujemy alfabetycznie
        if (countDiff === 0) {
          return cityA.localeCompare(cityB);
        }

        return countDiff;
      }
    );
  };

  // Filtrowanie i organizacja ogłoszeń
  const filteredAds =
    selectedType === "Wszystkie"
      ? ads
      : ads.filter((ad) => ad.type === selectedType);

  const organizedAds = organizeAds(filteredAds);

  // Funkcja sprawdzająca czy użytkownik jest autorem
  const isAuthor = (ad: ExtendedAdvertisement) => {
    // Sprawdzamy czy użytkownik jest zalogowany
    if (!session?.user?.email) {
      return false;
    }

    // Sprawdzamy czy użytkownik jest autorem ogłoszenia
    return ad.author.email === session.user.email;
  };

  // Funkcja sprawdzająca uprawnienia do edycji
  const canEditAd = (ad: ExtendedAdvertisement) => {
    if (!session?.user?.email) {
      return false;
    }

    // Sprawdzamy czy użytkownik jest adminem lub autorem
    const isAdmin = session.user.role === "admin";
    const isAuthor = ad.author.email === session.user.email;

    return isAdmin || isAuthor;
  };

  // Funkcja usuwania ogłoszenia
  const handleDelete = async (adId: string, authorEmail: string) => {
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

  // Dodajemy funkcję pomocniczą do określania statusu wydarzenia
  const getEventStatus = (date: string) => {
    const eventDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    // Resetujemy godziny dla poprawnego porównania dat
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() === today.getTime()) {
      return {
        type: "today",
        label: "Dziś",
        color: "bg-green-100 text-green-800",
      };
    } else if (eventDate.getTime() === tomorrow.getTime()) {
      return {
        type: "tomorrow",
        label: "Jutro",
        color: "bg-blue-100 text-blue-800",
      };
    } else if (eventDate < today) {
      return {
        type: "past",
        label: "Zakończone",
        color: "bg-gray-100 text-gray-600",
      };
    } else if (eventDate <= nextWeek) {
      return {
        type: "soon",
        label: "Wkrótce",
        color: "bg-amber-100 text-amber-800",
      };
    }
    return { type: "future", label: "", color: "" };
  };

  // Funkcja do zarządzania subskrypcją miasta
  const toggleCitySubscription = useCallback(
    async (city: string) => {
      if (!session?.user) {
        toast.error("Musisz być zalogowany, aby otrzymywać powiadomienia");
        return;
      }

      try {
        if (subscribedCities.includes(city)) {
          const newSubscribed = subscribedCities.filter((c) => c !== city);
          setSubscribedCities(newSubscribed);
          localStorage.setItem(
            "subscribedCities",
            JSON.stringify(newSubscribed)
          );
          toast.success(`Wyłączono powiadomienia dla miasta ${city}`);
        } else {
          const newSubscribed = [...subscribedCities, city];
          setSubscribedCities(newSubscribed);
          localStorage.setItem(
            "subscribedCities",
            JSON.stringify(newSubscribed)
          );
          toast.success(`Włączono powiadomienia dla miasta ${city}`);
        }
      } catch (error) {
        toast.error("Nie udało się zmienić ustawień powiadomień");
      }
    },
    [subscribedCities, session?.user]
  );

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
              Baciatowe Ogłoszenia
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
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance]">
        {organizedAds.map(([city, cityAds], index) => (
          <React.Fragment key={city}>
            {/* Co 4 miasta dodajemy reklamę */}
            {index > 0 && index % 4 === 0 && (
              <div className="break-inside-avoid mb-6">
                <AdCard />
              </div>
            )}

            {/* Reklama po trzecim mieście */}
            {index === 2 && (
              <div className="break-inside-avoid mb-6">
                <CityAdCard />
              </div>
            )}

            <div className="break-inside-avoid mb-6 bg-gray-50/50 rounded-xl p-4 hover:bg-gray-50 transition-colors">
              {/* Nagłówek miasta */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm">
                    <FaMapMarkerAlt className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{city}</h3>
                    <span className="text-xs text-gray-500">
                      {cityAds.length}{" "}
                      {cityAds.length === 1 ? "ogłoszenie" : "ogłoszeń"}
                    </span>
                  </div>
                </div>

                {/* Przycisk powiadomień */}
                {session?.user && (
                  <button
                    onClick={() => toggleCitySubscription(city)}
                    className={`p-2 rounded-lg transition-all
                      ${
                        subscribedCities.includes(city)
                          ? "text-amber-500 hover:text-amber-600 bg-amber-50"
                          : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                      }`}
                    title={
                      subscribedCities.includes(city)
                        ? `Wyłącz powiadomienia dla ${city}`
                        : `Włącz powiadomienia dla ${city}`
                    }
                  >
                    {subscribedCities.includes(city) ? (
                      <FaBell className="w-4 h-4" />
                    ) : (
                      <FaBellSlash className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Lista ogłoszeń */}
              <div className="space-y-2">
                {cityAds.length > 0 ? (
                  cityAds
                    .sort((a, b) => {
                      const diffA = getDateDifference(a.date);
                      const diffB = getDateDifference(b.date);
                      return diffA - diffB;
                    })
                    .map((ad) => {
                      const eventStatus = getEventStatus(ad.date);

                      console.log("Title:", ad.title);
                      console.log("Generated slug:", generateSlug(ad.title));
                      console.log(
                        "Full URL:",
                        `/szukam-partnera-do-tanca/ogloszenie/${generateSlug(
                          ad.title
                        )}-${ad._id}`
                      );

                      const adLink = `/szukam-partnera-do-tanca/ogloszenie/${generateSlug(
                        ad.title
                      )}-${ad._id}`;
                      console.log("Generowany link:", {
                        title: ad.title,
                        slug: generateSlug(ad.title),
                        id: ad._id,
                        fullLink: adLink,
                      });

                      return (
                        <div
                          key={ad._id}
                          className="group relative bg-white rounded-lg p-3 hover:shadow-md transition-all"
                        >
                          <Link
                            href={`/szukam-partnera-do-tanca/ogloszenie/${generateSlug(
                              ad.title
                            )}-${shortenId(ad._id)}`}
                            className="block group"
                          >
                            <div className="flex flex-col gap-1 min-w-0">
                              <div className="flex items-start gap-2 min-w-0">
                                <div className="flex-1 min-w-0">
                                  <h3 className="line-clamp-2 break-words">
                                    {ad.title}
                                  </h3>
                                </div>
                                {eventStatus.label && (
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${eventStatus.color}`}
                                  >
                                    {eventStatus.label}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
                                <span className="flex items-center gap-1 whitespace-nowrap">
                                  <FaCalendarAlt className="w-3 h-3 flex-shrink-0" />
                                  <span>
                                    {new Date(ad.date).toLocaleDateString(
                                      "pl-PL"
                                    )}
                                  </span>
                                </span>
                                {ad.time && (
                                  <span className="flex items-center gap-1 whitespace-nowrap">
                                    <FaClock className="w-3 h-3 flex-shrink-0" />
                                    <span>{ad.time}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>

                          {canEditAd(ad) && (
                            <div
                              className="flex items-center gap-2 opacity-0 group-hover:opacity-100 
                                           transition-opacity flex-shrink-0 ml-2"
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
                                onClick={() =>
                                  handleDelete(ad._id, ad.author.email)
                                }
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <FaTrash className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })
                ) : (
                  <p className="text-sm text-gray-500 text-center py-2">
                    Brak aktywnych ogłoszeń
                  </p>
                )}
              </div>
            </div>
          </React.Fragment>
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
