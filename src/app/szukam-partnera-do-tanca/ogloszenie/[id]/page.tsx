import { Advertisement } from "@/types/advertisement";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

async function getAdvertisement(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_APP_URL is not defined");
    }

    const url = new URL(`/api/advertisements/${id}`, baseUrl).toString();
    console.log("Fetching from URL:", url);

    // Wykonujemy zapytanie HTTP do API w celu pobrania ogłoszenia
    // - Używamy next.revalidate aby włączyć Incremental Static Regeneration (ISR)
    // - Dane będą odświeżane co 5 minut (300 sekund)
    // - Ustawiamy nagłówek Content-Type na application/json
    const res = await fetch(url, {
      next: {
        revalidate: 300, // 5 minut
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`Error status: ${res.status}`);
      const errorData = await res.json();
      console.error("Error details:", errorData);
      throw new Error(`Failed to fetch advertisement: ${res.status}`);
    }

    const data = await res.json();
    console.log("Fetched advertisement:", data);
    return data;
  } catch (error) {
    console.error("Error fetching advertisement:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const ad = await getAdvertisement(params.id);

  return {
    title: ad?.title || "Ogłoszenie",
    description: ad?.description || `${ad?.type} - ${ad?.location.city}`,
  };
}

export default async function AdvertisementPage({
  params,
}: {
  params: { id: string };
}) {
  const ad = await getAdvertisement(params.id);

  if (!ad) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/szukam-partnera-do-tanca"
        className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-8"
      >
        <FaArrowLeft />
        Powrót do ogłoszeń
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{ad.title}</h1>

        <p className="text-gray-600 mb-6 whitespace-pre-line">
          {ad.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <FaCalendarAlt className="text-amber-500" />
                <span>{new Date(ad.date).toLocaleDateString("pl-PL")}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <FaClock className="text-amber-500" />
                <span>{ad.time}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt className="text-amber-500" />
                <span>
                  {ad.location.city} • {ad.location.place}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-lg">
            <h2 className="font-semibold text-gray-800 mb-4">
              Autor ogłoszenia
            </h2>

            <div className="flex items-center gap-4">
              {ad.author.avatar && (
                <Image
                  src={ad.author.avatar}
                  alt={ad.author.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
              )}

              <div>
                <p className="font-medium text-gray-800">{ad.author.name}</p>
                <p className="text-sm text-gray-600">{ad.author.level}</p>
              </div>
            </div>

            <button
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-red-500 
                             text-white rounded-lg hover:from-amber-600 hover:to-red-600 
                             transition-all duration-300"
            >
              Napisz wiadomość
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
