"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { AdvertisementForm } from "./AdvertisementForm";
import Modal from "@/components/ui/Modal";

interface AddAdvertisementButtonProps {
  onSuccess?: () => void;
}

export function AddAdvertisementButton({
  onSuccess,
}: AddAdvertisementButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  const handleClick = () => {
    if (!session) {
      toast.error("Musisz być zalogowany, aby dodać ogłoszenie");
      return;
    }
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    onSuccess?.();
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
        onClose={() => setIsModalOpen(false)}
        title="Dodaj nowe ogłoszenie"
      >
        <AdvertisementForm mode="add" onSuccess={handleSuccess} />
      </Modal>
    </>
  );
}
