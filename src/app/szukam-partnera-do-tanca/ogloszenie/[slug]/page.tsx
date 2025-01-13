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
    const res = await fetch(`/api/advertisements/${id}`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching advertisement:", error);
    return null;
  }
}

async function getFullAdvertisementId(shortId: string): Promise<string | null> {
  try {
    const res = await fetch(`/api/advertisements`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      return null;
    }

    const ads = await res.json();
    const ad = ads.find((ad: any) => ad._id.toString().includes(shortId));
    return ad ? ad._id : null;
  } catch (error) {
    console.error("Error getting full ID:", error);
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
  try {
    console.log("1. Otrzymany slug:", params.slug);

    // Wyciągamy ID z końca sluga
    const slugParts = params.slug.split("-");
    const shortId = slugParts[slugParts.length - 1];
    console.log("2. Krótkie ID:", shortId);

    // Pobieramy pełne ID
    const fullId = await getFullAdvertisementId(shortId);
    console.log("3. Pełne ID:", fullId);

    if (!fullId) {
      console.log("4. Nie znaleziono pełnego ID");
      return notFound();
    }

    // Pobieramy ogłoszenie używając pełnego ID
    const ad = await getAdvertisement(fullId);
    console.log("5. Pobrane ogłoszenie:", ad ? "TAK" : "NIE");

    if (!ad) {
      console.log("6. Nie znaleziono ogłoszenia");
      return notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
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
  } catch (error) {
    console.error("ERROR:", error);
    return notFound();
  }
}
