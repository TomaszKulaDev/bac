"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUserProfile } from "@/hooks/useUserProfile";

const tabs = [
  { name: "Profil taneczny", href: "/profile" },
  { name: "Ustawienia", href: "/profile/settings" },
];

export default function ProfileTabs() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { userProfile } = useUserProfile();

  // Dodajmy console.log do debugowania
  console.log({
    sessionUserId: session?.user?.id,
    userProfileId: userProfile?.id,
    session,
    userProfile,
  });

  // Pokazuj zakładki dla zalogowanego użytkownika na stronie /profile
  const isProfilePage = pathname.startsWith("/profile");
  const isLoggedIn = !!session?.user;

  // Jeśli jesteśmy na stronie profilu i użytkownik jest zalogowany, pokazujemy zakładki
  if (!isProfilePage || !isLoggedIn) return null;

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="container mx-auto px-4 max-w-4xl">
        <div className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    isActive
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
