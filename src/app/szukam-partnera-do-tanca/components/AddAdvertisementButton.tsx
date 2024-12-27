"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { AdvertisementForm } from "./AdvertisementForm";
import Modal from "@/components/ui/Modal"; // Zakładam, że mamy już komponent Modal

export function AddAdvertisementButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  const handleClick = () => {
    if (!session) {
      toast.error("Musisz być zalogowany, aby dodać ogłoszenie");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="inline-flex items-center px-4 py-2 bg-amber-500 
                 text-white rounded-lg hover:bg-amber-600 transition-colors"
      >
        <span className="mr-2">➕</span>
        Dodaj ogłoszenie
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Dodaj nowe ogłoszenie"
      >
        <AdvertisementForm mode="add" onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
