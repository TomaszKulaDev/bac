"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AdvertisementForm } from "./AdvertisementForm";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { AdvertisementType } from "@/types/advertisement";

export function AddAdvertisementButton({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { user } = useAuth();
  const { userProfile } = useUserProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (!session) {
      router.push("/login");
      return;
    }
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    onSuccess?.();
  };

  const getAvatar = (): string | undefined => {
    if (userProfile?.avatar) return userProfile.avatar;
    if (user?.image) return user.image;
    return undefined;
  };

  // Domyślne wartości dla nowego ogłoszenia
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
      level: "Początkujący" as const,
    },
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-gradient-to-r from-amber-500 to-red-500 
                  hover:from-amber-600 hover:to-red-600 text-white 
                  py-2 px-4 rounded-lg font-medium transition-all duration-300
                  transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
                  flex items-center justify-center gap-2"
      >
        Dodaj ogłoszenie
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Dodaj nowe ogłoszenie"
      >
        <AdvertisementForm
          mode="add"
          onSuccess={handleSuccess}
          onCancel={handleCloseModal}
          initialData={defaultInitialData}
        />
      </Modal>
    </>
  );
}
