// import { Advertisement } from "@/types/advertisement";
// import { notFound } from "next/navigation";
// import {
//   FaArrowLeft,
//   FaCalendarAlt,
//   FaClock,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import Link from "next/link";
// import Image from "next/image";
// import { Metadata } from "next";

// const translateLevel = (level: string) => {
//   const levels = {
//     beginner: "Początkujący",
//     intermediate: "Średniozaawansowany",
//     advanced: "Zaawansowany",
//   };
//   return levels[level as keyof typeof levels] || level;
// };

// async function getAdvertisement(id: string) {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
//     if (!baseUrl) {
//       throw new Error("NEXT_PUBLIC_APP_URL is not defined");
//     }

//     const url = new URL(`/api/advertisements/${id}`, baseUrl).toString();
//     console.log("Fetching from URL:", url);

//     // Wykonujemy zapytanie HTTP do API w celu pobrania ogłoszenia
//     // - Używamy next.revalidate aby włączyć Incremental Static Regeneration (ISR)
//     // - Dane będą odświeżane co 5 minut (300 sekund)
//     // - Ustawiamy nagłówek Content-Type na application/json
//     const res = await fetch(url, {
//       next: {
//         revalidate: 300, // 5 minut
//       },
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) {
//       console.error(`Error status: ${res.status}`);
//       const errorData = await res.json();
//       console.error("Error details:", errorData);
//       throw new Error(`Failed to fetch advertisement: ${res.status}`);
//     }

//     const data = await res.json();
//     console.log("Fetched advertisement:", data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching advertisement:", error);
//     return null;
//   }
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string };
// }): Promise<Metadata> {
//   const ad = await getAdvertisement(params.id);

//   return {
//     title: ad?.title || "Ogłoszenie",
//     description: ad?.description || `${ad?.type} - ${ad?.location.city}`,
//   };
// }

// export default async function AdvertisementPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const ad = await getAdvertisement(params.id);

//   if (!ad) {
//     notFound();
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* ============= REKLAMA LEWA ============= */}
//         {/* Lewa kolumna - reklama pionowa format 160x600 */}
//         <div className="hidden lg:block">
//           <div className="sticky top-6 space-y-6">
//             <div
//               className="bg-white rounded-xl shadow-lg p-4"
//               id="ad-left-skyscraper"
//             >
//               <span className="text-sm text-gray-500">Reklama</span>
//               <div className="h-[600px] flex items-center justify-center">
//                 {/* TODO: Zaimplementować skyscraper reklamowy Google AdSense/DFP 160x600 */}
//                 <span className="text-gray-400">Reklama 160x600</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Główna treść - środkowa część */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Nawigacja */}
//           <Link
//             href="/szukam-partnera-do-tanca"
//             className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700"
//           >
//             <FaArrowLeft />
//             Powrót do ogłoszeń
//           </Link>

//           {/* Główna karta z tytułem i opisem */}
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <div className="flex justify-between items-start mb-6">
//               <h1 className="text-2xl font-bold text-gray-800">{ad.title}</h1>
//               <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
//                 {ad.type}
//               </span>
//             </div>
//             <p className="text-gray-600 whitespace-pre-line">
//               {ad.description}
//             </p>
//           </div>

//           {/* Karta ze szczegółami */}
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-lg font-semibold text-gray-800 mb-6">
//               Szczegóły spotkania
//             </h2>
//             <div className="grid gap-6">
//               <div className="flex items-center gap-3 text-gray-600">
//                 <FaCalendarAlt className="text-amber-500 w-5 h-5" />
//                 <div>
//                   <p className="text-sm text-gray-500">Data</p>
//                   <p>{new Date(ad.date).toLocaleDateString("pl-PL")}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 text-gray-600">
//                 <FaClock className="text-amber-500 w-5 h-5" />
//                 <div>
//                   <p className="text-sm text-gray-500">Godzina</p>
//                   <p>{ad.time}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 text-gray-600">
//                 <FaMapMarkerAlt className="text-amber-500 w-5 h-5" />
//                 <div>
//                   <p className="text-sm text-gray-500">Lokalizacja</p>
//                   <p>
//                     {ad.location.city} • {ad.location.place}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sekcja partnerów biznesowych */}
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-lg font-semibold text-gray-800 mb-6">
//               Polecane szkoły tańca
//             </h2>
//             <div className="grid grid-cols-3 gap-4">
//               {[1, 2, 3].map((partner) => (
//                 <div
//                   key={partner}
//                   className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
//                 >
//                   <div className="aspect-[4/3] bg-gray-100 relative">
//                     {/* Placeholder na zdjęcie */}
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <span className="text-gray-400">Logo</span>
//                     </div>
//                   </div>
//                   <div className="p-4">
//                     <h3 className="text-sm font-medium text-gray-800 mb-1">
//                       Szkoła Tańca {partner}
//                     </h3>
//                     <p className="text-xs text-gray-500">Partner</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Prawa kolumna - autor i reklamy */}
//         <div className="space-y-6">
//           {/* Karta autora */}
//           <div className="bg-white rounded-xl shadow-lg p-8 sticky top-6">
//             <h2 className="font-semibold text-gray-800 mb-6">
//               Autor ogłoszenia
//             </h2>

//             <div className="flex items-center gap-4 mb-6">
//               <div className="w-12 h-12 flex-shrink-0">
//                 <Image
//                   src={ad.author.image || "/images/default-avatar.png"}
//                   alt={ad.author.name}
//                   width={48}
//                   height={48}
//                   className="rounded-full object-cover w-full h-full"
//                   priority
//                 />
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   {ad.author.name}
//                 </h2>
//                 <p className="text-gray-600">
//                   {translateLevel(ad.author.level)}
//                 </p>
//               </div>
//             </div>

//             <button
//               className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-red-500
//                            text-white rounded-lg hover:from-amber-600 hover:to-red-600
//                            transition-all duration-300"
//             >
//               Napisz wiadomość
//             </button>
//           </div>

//           {/* ============= REKLAMA PRAWA ============= */}
//           {/* Reklama pod kartą autora - format 300x250 */}
//           <div
//             className="bg-white rounded-xl shadow-lg p-4"
//             id="ad-right-rectangle"
//           >
//             <span className="text-sm text-gray-500">Reklama</span>
//             <div className="h-[250px] flex items-center justify-center">
//               {/* TODO: Zaimplementować rectangle reklamowy Google AdSense/DFP 300x250 */}
//               <span className="text-gray-400">Reklama 300x250</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
