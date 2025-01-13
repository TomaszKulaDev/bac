import { Advertisement } from "@/types/advertisement";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { generateSlug } from "@/utils/slug";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { shortenId } from "@/utils/shortId";

const translateLevel = (level: string) => {
  const levels = {
    beginner: "Początkujący",
    intermediate: "Średniozaawansowany",
    advanced: "Zaawansowany",
  };
  return levels[level as keyof typeof levels] || level;
};

async function getAdvertisement(id: string): Promise<Advertisement | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_APP_URL is not defined");
    }

    const url = new URL(`/api/advertisements/${id}`, baseUrl).toString();
    const res = await fetch(url, {
      next: {
        revalidate: 0,
        tags: ["advertisement"],
      },
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Error status: ${res.status}`);
      throw new Error(`Failed to fetch advertisement: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching advertisement:", error);
    return null;
  }
}

async function getFullAdvertisementId(shortId: string): Promise<string | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const res = await fetch(`${baseUrl}/api/advertisements`);
    const ads = await res.json();
    const allIds = ads.map((ad: Advertisement) => ad._id);
    return allIds.find((id: string) => id.startsWith(shortId)) || null;
  } catch (error) {
    console.error("Error fetching full ID:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slugParts = params.slug.split("-");
  const id = slugParts[slugParts.length - 1];
  const ad = await getAdvertisement(id);

  if (!ad) {
    return {
      title: "Nie znaleziono ogłoszenia",
      description: "Ogłoszenie nie istnieje lub zostało usunięte",
    };
  }

  return {
    title: `${ad.title} | Baciata.pl`,
    description: ad.description,
    openGraph: {
      title: ad.title,
      description: ad.description,
      type: "article",
      url: `https://baciata.pl/szukam-partnera-do-tanca/ogloszenie/${generateSlug(
        ad.title
      )}-${id}`,
      images: [
        {
          url: ad.author.image || "/images/default-og-image.jpg",
          width: 1200,
          height: 630,
          alt: ad.title,
        },
      ],
    },
  };
}

export default async function AdvertisementPage({
  params,
}: {
  params: { slug: string };
}) {
  const slugParts = params.slug.split("-");
  const shortId = slugParts[slugParts.length - 1];

  const ad = await getAdvertisement(shortId);

  if (!ad) {
    notFound();
  }

  // Sprawdzamy czy URL jest poprawny
  const expectedSlug = `${generateSlug(ad.title)}-${shortenId(ad._id)}`;
  if (params.slug !== expectedSlug) {
    redirect(`/szukam-partnera-do-tanca/ogloszenie/${expectedSlug}`);
  }

  console.log("Current advertisement title:", ad.title);

  console.log("Params:", params);
  console.log("ID:", shortId);
  console.log("Ad:", ad);
  console.log("Expected slug:", expectedSlug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Lewa kolumna - reklama pionowa */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <span className="text-sm text-gray-500">Reklama</span>
            <div className="h-[600px] flex items-center justify-center">
              <span className="text-gray-400">Reklama 160x600</span>
            </div>
          </div>
        </div>

        {/* Środkowa kolumna - treść ogłoszenia */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Link
              href="/szukam-partnera-do-tanca"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6"
            >
              <FaArrowLeft />
              Wróć do listy ogłoszeń
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {ad.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-amber-500" />
                <span>{new Date(ad.date).toLocaleDateString("pl-PL")}</span>
              </div>
              {ad.time && (
                <div className="flex items-center gap-2">
                  <FaClock className="text-amber-500" />
                  <span>{ad.time}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-amber-500" />
                <span>
                  {ad.location.city}, {ad.location.place}
                </span>
              </div>
            </div>

            <div className="prose max-w-none">
              <p>{ad.description}</p>
            </div>
          </div>

          {/* Sekcja partnerów biznesowych */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Polecane szkoły tańca
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((partner) => (
                <div
                  key={partner}
                  className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[4/3] bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400">Logo</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-1">
                      Szkoła Tańca {partner}
                    </h3>
                    <p className="text-xs text-gray-500">Partner</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prawa kolumna - autor i reklamy */}
        <div className="space-y-6">
          {/* Karta autora */}
          <div className="bg-white rounded-xl shadow-lg p-8 sticky top-6">
            <h2 className="font-semibold text-gray-800 mb-6">
              Autor ogłoszenia
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex-shrink-0">
                <Image
                  src={ad.author.image || "/images/default-avatar.png"}
                  alt={ad.author.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover w-full h-full"
                  priority
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {ad.author.name}
                </h2>
                <p className="text-gray-600">
                  {translateLevel(ad.author.level)}
                </p>
              </div>
            </div>

            <button
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-red-500 
                           text-white rounded-lg hover:from-amber-600 hover:to-red-600 
                           transition-all duration-300"
            >
              Napisz wiadomość
            </button>
          </div>

          {/* Reklama pod kartą autora */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <span className="text-sm text-gray-500">Reklama</span>
            <div className="h-[250px] flex items-center justify-center">
              <span className="text-gray-400">Reklama 300x250</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
