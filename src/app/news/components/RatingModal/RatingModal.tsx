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
  musicality: "Muzykalność",
  atmosphere: "Atmosfera na zajęciach",
  communication: "Komunikatywność",
  studentDancing: "Tańczą z kursantami na zajęciach",
  socialDancing: "Tańczą z kursantami na imprezach/socjalach",
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
    musicality: 0,
    atmosphere: 0,
    communication: 0,
    studentDancing: 0,
    socialDancing: 0,
  });

  useEffect(() => {
    if (!isOpen) {
      setRatings({
        teaching: 0,
        technique: 0,
        musicality: 0,
        atmosphere: 0,
        communication: 0,
        studentDancing: 0,
        socialDancing: 0,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRatingChange = (
    category: keyof InstructorRating,
    value: number
  ) => {
    setRatings((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmit = () => {
    const hasAllRatings = Object.values(ratings).every((rating) => rating > 0);

    if (!hasAllRatings) {
      alert("Proszę ocenić wszystkie kategorie przed wysłaniem");
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
              <p className="text-gray-300">{label}</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() =>
                      handleRatingChange(key as keyof InstructorRating, star)
                    }
                    className={`text-2xl ${
                      star <= ratings[key as keyof InstructorRating]
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
