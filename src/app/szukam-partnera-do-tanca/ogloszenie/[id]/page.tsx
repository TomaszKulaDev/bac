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

async function getAdvertisement(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const url = new URL(`/api/advertisements/${id}`, baseUrl).toString();

    console.log("Fetching from URL:", url);

    const res = await fetch(url, {
      cache: "no-store",
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
