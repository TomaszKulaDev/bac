// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function TancerzePage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
//       </div>
//     );
//   }

//   if (!session) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="max-w-md w-full mx-auto p-8">
//           <div className="text-center space-y-6">
//             <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto flex items-center justify-center">
//               <span className="text-2xl">💃</span>
//             </div>

//             <div className="space-y-2">
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Ups! Tutaj tylko dla zalogowanych tancerek i tancerzy!
//               </h1>
//               <p className="text-gray-600">
//                 Hej! Wygląda na to, że chcesz zobaczyć nasze wspaniałe tancerki
//                 albo tancerzy ale najpierw musisz dołączyć do naszego tanecznego
//                 grona! Nie martw się - to tylko dwa kroki od parkietu! 🕺
//               </p>
//               <p className="text-sm text-amber-600 italic mt-2">
//                 Dołącz do nas i poznaj pasjonatów tańca z całej Polski!
//               </p>
//             </div>

//             <div className="space-y-3">
//               <button
//                 onClick={() =>
//                   router.push("/login?callbackUrl=/tancerki-tancerze-bachaty")
//                 }
//                 className="block w-full px-4 py-2 text-sm font-medium text-white
//                          bg-amber-500 hover:bg-amber-600 rounded-lg
//                          transition-colors duration-200"
//               >
//                 Wejdź na parkiet! (Zaloguj się)
//               </button>

//               <button
//                 onClick={() => router.push("/register")}
//                 className="block w-full px-4 py-2 text-sm font-medium
//                          text-amber-600 bg-white hover:bg-amber-50 rounded-lg
//                          transition-colors duration-200 border border-amber-200"
//               >
//                 Pierwszy raz? Dołącz do naszego tanecznego świata!
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Tancerki i Tancerze Bachaty</h1>
//       {/* Tutaj komponent z listą profili */}
//     </div>
//   );
// }
