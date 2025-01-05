"use client";

import { useState } from "react";
import {
  FaSearch,
  FaUserPlus,
  FaHeart,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AdvertisementType, DanceLevel } from "@/types/advertisement";
import { AdvertisementForm } from "./AdvertisementForm";

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { userProfile } = useUserProfile();
  const { data: session } = useSession();
  const router = useRouter();

  const scrollToSearch = () => {
    const searchSection = document.getElementById("search-section");
    if (searchSection) {
      const offset = 80;
      const elementPosition = searchSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToProfiles = () => {
    const profilesSection = document.getElementById("profiles-section");
    if (profilesSection) {
      const offset = 80;
      const elementPosition = profilesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleAddAdvertisement = () => {
    if (!session) {
      router.push("/login");
      return;
    }
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
  };

  const getAvatar = (): string | undefined => {
    if (userProfile?.image) return userProfile.image;
    if (user?.image) return user.image;
    return undefined;
  };

  const defaultInitialData = {
    type: "Praktis" as AdvertisementType,
    title: "",
    description: "",
    date: "",
    time: "",
    location: {
      city: "",
      place: "",
    },
    author: {
      avatar: getAvatar(),
      name: user?.name || "",
      level: "Początkujący" as DanceLevel,
    },
  };

  return (
    <section
      className="relative min-h-[600px] bg-gray-900"
      aria-label="Główny banner"
    >
      {/* Tło z gradientem */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Obrazek tła */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform blur-sm"
          style={{
            backgroundImage:
              'url("/images/Hero-szukam-partnera-do-tanca.webp")',
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />

        {/* Animowane gradienty */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent animate-pulse-slow" />
          <div className="absolute inset-0 bg-gradient-to-l from-amber-600/10 to-transparent animate-pulse-slow delay-1000" />
        </div>
      </div>

      {/* Zawartość */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Nagłówek */}
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight">
            Znajdź Idealnego{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Partnera do Tańca
            </span>
          </h1>

          {/* Podtytuł */}
          <p className="text-xl text-gray-300 max-w-2xl">
            Dołącz do największej społeczności tancerzy Bachaty w Polsce. Znajdź
            partnera na praktis lub do regularnych zajęć.
          </p>

          {/* Przyciski akcji */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={scrollToProfiles}
              className="px-8 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl
                       flex items-center justify-center gap-2 transition-all group
                       border border-white/20 backdrop-blur-sm"
            >
              <FaSearch className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Szukaj Partnera
            </button>

            <button
              onClick={handleAddAdvertisement}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 
                       hover:from-amber-600 hover:to-amber-700 text-white rounded-xl
                       flex items-center justify-center gap-2 transition-all group"
            >
              <FaUserPlus className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Dodaj Ogłoszenie
            </button>
          </div>

          {/* Statystyki */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mt-12">
            {[
              { icon: FaUsers, value: "0,5", label: "Aktywnych Tancerzy" },
              { icon: FaMapMarkerAlt, value: "Tylko Mielec", label: "Miast" },
              { icon: FaHeart, value: "Całe 0", label: "Połączonych Par" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10
                         hover:bg-white/10 transition-colors group"
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <stat.icon className="w-6 h-6 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Dodaj nowe ogłoszenie"
      >
        <AdvertisementForm
          mode="add"
          onSuccess={handleSuccess}
          onCancel={() => setIsModalOpen(false)}
          initialData={defaultInitialData}
        />
      </Modal>
    </section>
  );
}
