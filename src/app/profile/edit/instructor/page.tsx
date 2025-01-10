"use client";

import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "react-toastify";

export default function InstructorProfilePage() {
  const { userProfile, updateUserProfile } = useUserProfile();

  if (!userProfile) return null;

  const instructorProfile = userProfile.instructorProfile || {
    isInstructor: false,
    specializations: [],
    experience: "",
    certificates: [],
    classes: [],
    pricing: {
      privateClass: 0,
      groupClass: 0,
    },
  };

  const handleUpdate = async (data: Partial<typeof instructorProfile>) => {
    try {
      await updateUserProfile({
        instructorProfile: {
          ...instructorProfile,
          ...data,
        },
      });
      toast.success("Zaktualizowano profil instruktora");
    } catch (error) {
      toast.error("Błąd podczas aktualizacji");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Profil instruktora</h3>

        {/* Przełącznik statusu instruktora */}
        <div className="mb-6">
          <label className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Status instruktora</h4>
              <p className="text-sm text-gray-500">
                Włącz, aby pokazać się jako instruktor
              </p>
            </div>
            <input
              type="checkbox"
              checked={instructorProfile.isInstructor}
              onChange={(e) => handleUpdate({ isInstructor: e.target.checked })}
              className="toggle toggle-amber"
            />
          </label>
        </div>

        {instructorProfile.isInstructor && (
          <div className="space-y-6">
            {/* Specjalizacje */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                Specjalizacje
              </label>
              {/* Tu dodaj wybór stylów tańca */}
            </div>

            {/* Doświadczenie */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                Doświadczenie
              </label>
              <textarea
                value={instructorProfile.experience}
                onChange={(e) => handleUpdate({ experience: e.target.value })}
                className="w-full rounded-lg"
                rows={4}
              />
            </div>

            {/* Certyfikaty */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                Certyfikaty
              </label>
              {/* Tu dodaj listę certyfikatów */}
            </div>

            {/* Cennik */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">Cennik</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">
                    Lekcja prywatna (PLN/h)
                  </label>
                  <input
                    type="number"
                    value={instructorProfile.pricing.privateClass}
                    onChange={(e) =>
                      handleUpdate({
                        pricing: {
                          ...instructorProfile.pricing,
                          privateClass: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">
                    Zajęcia grupowe (PLN/h)
                  </label>
                  <input
                    type="number"
                    value={instructorProfile.pricing.groupClass}
                    onChange={(e) =>
                      handleUpdate({
                        pricing: {
                          ...instructorProfile.pricing,
                          groupClass: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
