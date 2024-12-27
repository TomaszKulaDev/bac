"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { AdvertisementType, DanceLevel } from "@/types/advertisement";

interface AdvertisementFormProps {
  mode: "add" | "edit";
  initialData?: {
    _id?: string;
    type: AdvertisementType;
    title: string;
    date: string;
    time: string;
    location: {
      city: string;
      place: string;
    };
  };
  onSuccess?: () => void;
}

export function AdvertisementForm({
  mode,
  initialData,
  onSuccess,
}: AdvertisementFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    type: initialData?.type || "Praktis",
    title: initialData?.title || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    location: {
      city: initialData?.location?.city || "",
      place: initialData?.location?.place || "",
    },
    level: "Średniozaawansowany" as DanceLevel,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      toast.error("Musisz być zalogowany");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint =
        mode === "add"
          ? "/api/advertisements"
          : `/api/advertisements/${initialData?._id}`;

      const method = mode === "add" ? "POST" : "PUT";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          author: {
            name: session.user.name,
            level: formData.level,
            avatar: session.user.image,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Wystąpił błąd");
      }

      toast.success(
        mode === "add"
          ? "Ogłoszenie zostało dodane"
          : "Ogłoszenie zostało zaktualizowane"
      );

      onSuccess?.();
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Nie udało się zapisać ogłoszenia");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Typ ogłoszenia
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as AdvertisementType,
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-amber-500 focus:ring-amber-500"
            required
          >
            <option value="Praktis">Praktis</option>
            <option value="Social">Social</option>
            <option value="Kurs">Kurs</option>
            <option value="Inne">Inne</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tytuł
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-amber-500 focus:ring-amber-500"
            required
            placeholder="np. Trening Kizomby"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-amber-500 focus:ring-amber-500"
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Godziny
            </label>
            <input
              type="text"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-amber-500 focus:ring-amber-500"
              required
              placeholder="np. 17:00-19:00"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Miasto
            </label>
            <input
              type="text"
              value={formData.location.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, city: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-amber-500 focus:ring-amber-500"
              required
              placeholder="np. Warszawa"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Miejsce
            </label>
            <input
              type="text"
              value={formData.location.place}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, place: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-amber-500 focus:ring-amber-500"
              required
              placeholder="np. Szkoła Tańca XYZ"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Poziom zaawansowania
          </label>
          <select
            value={formData.level}
            onChange={(e) =>
              setFormData({
                ...formData,
                level: e.target.value as DanceLevel,
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-amber-500 focus:ring-amber-500"
            required
          >
            <option value="Początkujący">Początkujący</option>
            <option value="Średniozaawansowany">Średniozaawansowany</option>
            <option value="Zaawansowany">Zaawansowany</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                   text-sm font-medium text-gray-700 bg-white 
                   hover:bg-gray-50 transition-colors"
        >
          Anuluj
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm 
                   text-sm font-medium text-white bg-amber-500 
                   hover:bg-amber-600 transition-colors disabled:opacity-50"
        >
          {isSubmitting
            ? "Zapisywanie..."
            : mode === "add"
            ? "Dodaj ogłoszenie"
            : "Zapisz zmiany"}
        </button>
      </div>
    </form>
  );
}
