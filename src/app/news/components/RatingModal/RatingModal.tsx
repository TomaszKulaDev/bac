import { useState, useEffect } from "react";
import { PolishArtist, InstructorRating } from "../PolishPromoArtist/types";

interface RatingModalProps {
  artist: PolishArtist;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: InstructorRating) => void;
}

const ratingCategories = {
  teaching: "Umiejętności nauczania",
  technique: "Technika tańca",
  atmosphere: "Atmosfera na zajęciach",
};

export const RatingModal = ({
  artist,
  isOpen,
  onClose,
  onSubmit,
}: RatingModalProps) => {
  const [ratings, setRatings] = useState<InstructorRating>({
    teaching: 0,
    technique: 0,
    atmosphere: 0,
    studentDancing: false,
    socialDancing: false,
  });

  useEffect(() => {
    if (!isOpen) {
      setRatings({
        teaching: 0,
        technique: 0,
        atmosphere: 0,
        studentDancing: false,
        socialDancing: false,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRatingChange = (
    category: keyof typeof ratingCategories,
    value: number
  ) => {
    setRatings((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleToggleChange = (field: "studentDancing" | "socialDancing") => {
    setRatings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = () => {
    const hasValidRatings = Object.entries(ratingCategories).every(([key]) => {
      const rating = ratings[key as keyof typeof ratingCategories];
      return rating >= 1 && rating <= 5;
    });

    if (!hasValidRatings) {
      alert("Proszę ocenić wszystkie kategorie w skali od 1 do 5 gwiazdek");
      return;
    }

    onSubmit(ratings);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#242424] rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl text-white">{artist.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {Object.entries(ratingCategories).map(([key, label]) => (
            <div key={key} className="space-y-2">
              <p className="text-gray-300">
                {label} <span className="text-red-500">*</span>
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() =>
                      handleRatingChange(
                        key as keyof typeof ratingCategories,
                        star
                      )
                    }
                    className={`text-2xl ${
                      star <= ratings[key as keyof typeof ratingCategories]
                        ? "text-yellow-400"
                        : "text-gray-600"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-4 mt-8">
            <h4 className="text-gray-300 mb-4 font-medium">
              Informacje o prowadzeniu zajęć
            </h4>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div
                onClick={() => handleToggleChange("studentDancing")}
                className={`
                  p-4 rounded-xl cursor-pointer
                  ${
                    ratings.studentDancing
                      ? "bg-green-900/30 border-green-500"
                      : "bg-purple-900/30 border-purple-500"
                  }
                  border transition-all duration-300
                  hover:border-opacity-100 border-opacity-50
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className={`w-6 h-6 ${
                      ratings.studentDancing
                        ? "text-green-400"
                        : "text-purple-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span
                    className={`
                      text-center text-sm font-medium
                      ${
                        ratings.studentDancing
                          ? "text-green-400"
                          : "text-purple-400"
                      }
                    `}
                  >
                    Czy tańczy z kursantami na zajęciach?
                  </span>
                  <div
                    className={`
                      mt-2 text-xs
                      ${
                        ratings.studentDancing
                          ? "text-green-500"
                          : "text-purple-500"
                      }
                    `}
                  >
                    {ratings.studentDancing ? (
                      <span className="text-green-500">
                        Zdecydowanie częściej <strong>TAK</strong>
                      </span>
                    ) : (
                      <span className="text-red-500">
                        Zdecydowanie częściej <strong>NIE</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div
                onClick={() => handleToggleChange("socialDancing")}
                className={`
                  p-4 rounded-xl cursor-pointer
                  ${
                    ratings.socialDancing
                      ? "bg-green-900/30 border-green-500"
                      : "bg-purple-900/30 border-purple-500"
                  }
                  border transition-all duration-300
                  hover:border-opacity-100 border-opacity-50
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className={`w-6 h-6 ${
                      ratings.socialDancing
                        ? "text-green-400"
                        : "text-purple-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10h.01M15 10h.01M9.75 15a4 4 0 005.5 0"
                    />
                  </svg>
                  <span
                    className={`
                      text-center text-sm font-medium
                      ${
                        ratings.socialDancing
                          ? "text-green-400"
                          : "text-purple-400"
                      }
                    `}
                  >
                    Czy tańczy z kursantami na imprezach?
                  </span>
                  <div
                    className={`
                      mt-2 text-xs
                      ${
                        ratings.socialDancing
                          ? "text-green-500"
                          : "text-purple-500"
                      }
                    `}
                  >
                    {ratings.socialDancing ? (
                      <span className="text-green-500">
                        Zdecydowanie cześciej <strong>TAK</strong>
                      </span>
                    ) : (
                      <span className="text-red-500">
                        Zdecydowanie cześciej <strong>NIE</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Anuluj
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Oceń
          </button>
        </div>
      </div>
    </div>
  );
};
