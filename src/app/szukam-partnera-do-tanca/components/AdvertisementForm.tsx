"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { AdvertisementType, DanceLevel } from "@/types/advertisement";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";

// Dodajemy interfejs dla błędów
interface ValidationErrors {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: {
    city?: string;
    place?: string;
  };
}

interface AdvertisementFormProps {
  mode: "add" | "edit";
  initialData?: {
    _id?: string;
    type: AdvertisementType;
    title: string;
    description: string;
    date: string;
    time: string;
    location: {
      city: string;
      place: string;
    };
    author?: {
      name: string;
      level: DanceLevel;
      avatar?: string;
    };
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

// Przykładowe szablony opisów
const descriptionTemplates = [
  {
    type: "Praktis",
    template:
      "Szukam partnera/ki do regularnych praktisów. Poziom: [poziom]. Preferowane dni: [dni tygodnia], godziny: [zakres]. Miejsce: [dzielnica/studio]. Cel: doskonalenie [figura/styl].",
  },
  {
    type: "Social",
    template:
      "Szukam partnera/ki na social dance w [miejsce]. Data: [data], od [godzina]. Poziom: [poziom]. Preferowane style: [style tańca]. Cel: wspólna zabawa i rozwój umiejętności.",
  },
  {
    type: "Kurs",
    template:
      "Poszukuję osoby do wspólnego uczestnictwa w kursie [styl tańca]. Szkoła: [nazwa szkoły]. Start kursu: [data]. Poziom: [poziom]. Dni zajęć: [dni], godziny: [godziny].",
  },
  {
    type: "Pokazy",
    template:
      "Szukam partnera/ki do przygotowania pokazu na [wydarzenie]. Styl: [styl]. Wymagany poziom: [poziom]. Planowane występy: [daty]. Próby: [częstotliwość] w [miejsce].",
  },
  {
    type: "Inne",
    template:
      "Szukam partnera/ki do [cel/wydarzenie]. Styl tańca: [styl]. Poziom: [poziom]. Szczegóły: [dodatkowe informacje]. Preferowane miejsce: [lokalizacja]. Kontakt: [sposób kontaktu].",
  },
];

interface FormData {
  title: string;
  description: string;
  type: AdvertisementType;
  date: string;
  time: string;
  location: {
    city: string;
    place: string;
  };
  author: {
    name: string;
    level: DanceLevel;
  };
}

export function AdvertisementForm({
  mode,
  initialData,
  onSuccess,
  onCancel,
}: AdvertisementFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({}); // Dodajemy stan dla błędów
  const { user } = useAuth();
  const { userProfile } = useUserProfile();

  const [formData, setFormData] = useState<FormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    type: initialData?.type || "Praktis",
    date: initialData?.date || "",
    time: initialData?.time || "",
    location: {
      city: initialData?.location?.city || "",
      place: initialData?.location?.place || "",
    },
    author: {
      name: user?.name || "",
      level: initialData?.author?.level || "Początkujący",
    },
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        author: {
          ...prev.author,
          name: user.name || "",
        },
      }));
    }
  }, [user]);

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
            level: formData.author.level,
            avatar: userProfile?.avatar || session.user.image || null,
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
      toast.error(
        mode === "add"
          ? "Nie udało się dodać ogłoszenia"
          : "Nie udało się zaktualizować ogłoszenia"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Walidacja tytułu
    if (!formData.title.trim()) {
      newErrors.title = "Tytuł jest wymagany";
    } else if (formData.title.length < 5) {
      newErrors.title = "Tytuł musi mieć minimum 5 znaków";
    } else if (formData.title.length > 24) {
      newErrors.title = "Tytuł nie może być dłuższy niż 24 znaki";
    }

    // Walidacja czasu
    if (!formData.time) {
      newErrors.time = "Czas jest wymagany";
    } else if (formData.time.length > 12) {
      newErrors.time = "Czas nie może być dłuższy niż 12 znaków";
    }

    // Walidacja miasta
    if (!formData.location.city.trim()) {
      newErrors.location = {
        ...newErrors.location,
        city: "Miasto jest wymagane",
      };
    } else if (formData.location.city.length > 20) {
      newErrors.location = {
        ...newErrors.location,
        city: "Nazwa miasta nie może być dłuższa niż 20 znaków",
      };
    }

    // Walidacja miejsca
    if (!formData.location.place.trim()) {
      newErrors.location = {
        ...newErrors.location,
        place: "Miejsce jest wymagane",
      };
    } else if (formData.location.place.length < 3) {
      newErrors.location = {
        ...newErrors.location,
        place: "Nazwa miejsca musi mieć minimum 3 znaki",
      };
    } else if (formData.location.place.length > 37) {
      newErrors.location = {
        ...newErrors.location,
        place: "Nazwa miejsca nie może być dłuższa niż 37 znaków",
      };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTemplateSelect = (template: string) => {
    setFormData((prev) => ({
      ...prev,
      description: template,
    }));
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      author: {
        ...prev.author,
        level: e.target.value as DanceLevel,
      },
    }));
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
            maxLength={24}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Krótki opis
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              maxLength={255}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 
                       shadow-sm focus:border-amber-500 focus:ring-amber-500 
                       sm:text-sm p-2"
              placeholder="Opisz krótko czego szukasz (max 255 znaków)"
            />

            {/* Szablony opisów */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Przykładowe szablony opisów:
              </p>
              <div className="space-y-2">
                {descriptionTemplates
                  .filter((template) => template.type === formData.type)
                  .map((template, index) => (
                    <div
                      key={index}
                      onClick={() => handleTemplateSelect(template.template)}
                      className="p-3 border rounded-md cursor-pointer hover:bg-amber-50 
                               text-sm text-gray-600 transition-colors"
                    >
                      {template.template}
                      <button
                        type="button"
                        className="ml-2 text-amber-600 hover:text-amber-700 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(template.template);
                        }}
                      >
                        Kopiuj
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.description.length}/255 znaków
            </p>
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
                className={`mt-1 block w-full rounded-md shadow-sm 
                         ${errors.time ? "border-red-500" : "border-gray-300"}
                         focus:border-amber-500 focus:ring-amber-500`}
                required
                maxLength={12}
                placeholder="np. 19:00-20:00"
              />
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time}</p>
              )}
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
                className={`mt-1 block w-full rounded-md shadow-sm 
                         ${
                           errors.location?.city
                             ? "border-red-500"
                             : "border-gray-300"
                         }
                         focus:border-amber-500 focus:ring-amber-500`}
                required
                maxLength={20}
              />
              {errors.location?.city && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.city}
                </p>
              )}
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
                className={`mt-1 block w-full rounded-md shadow-sm 
                         ${
                           errors.location?.place
                             ? "border-red-500"
                             : "border-gray-300"
                         }
                         focus:border-amber-500 focus:ring-amber-500`}
                required
                minLength={3}
                maxLength={37}
              />
              {errors.location?.place && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.place}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Poziom zaawansowania
            </label>
            <select
              value={formData.author.level}
              onChange={handleLevelChange}
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
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
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
