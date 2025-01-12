import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import { Instructor, InstructorLevel } from "@/types/instructor";

interface InstructorCardProps {
  instructor: Instructor;
  lightMode?: boolean;
}

const getGradientClass = (level: InstructorLevel): string => {
  const gradients = {
    master: "from-amber-500 to-red-500",
    expert: "from-purple-500 to-pink-500",
    advanced: "from-blue-500 to-cyan-500",
  };
  return gradients[level] || gradients.advanced;
};

export function InstructorCard({
  instructor,
  lightMode = false,
}: InstructorCardProps) {
  return (
    <motion.div
      className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300
        ${lightMode ? "bg-white" : "bg-white/10 backdrop-blur-sm"}
        border border-amber-100/50`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Zdjęcie */}
      <div className="relative aspect-[4/3]">
        <Image
          src={instructor.image}
          alt={instructor.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium shadow-md
            ${
              lightMode ? "bg-white text-gray-900" : "bg-white/90 text-gray-900"
            }`}
          >
            {instructor.hourlyRate} zł/h
          </span>
        </div>
      </div>

      {/* Informacje */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3
              className={`text-xl font-bold mb-1
              ${lightMode ? "text-gray-900" : "text-white"}`}
            >
              {instructor.name}
            </h3>
            <p className="text-amber-500 text-sm">{instructor.level}</p>
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="text-amber-400" />
            <span
              className={`font-medium
              ${lightMode ? "text-gray-900" : "text-white"}`}
            >
              {instructor.rating}
            </span>
            <span
              className={`text-sm
              ${lightMode ? "text-gray-500" : "text-gray-400"}`}
            >
              ({instructor.reviewCount})
            </span>
          </div>
        </div>

        {/* Specjalizacje */}
        <div className="flex flex-wrap gap-2 mb-4">
          {instructor.specialization.map((spec) => (
            <span
              key={spec}
              className={`px-3 py-1 rounded-full text-sm
                ${
                  lightMode
                    ? "bg-amber-50 text-amber-700"
                    : "bg-white/10 text-white/80"
                }`}
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Dostępność */}
        <div className="mb-4">
          <h4
            className={`text-sm mb-2
            ${lightMode ? "text-gray-600" : "text-white/80"}`}
          >
            Dostępność:
          </h4>
          <div className="flex flex-wrap gap-2">
            {instructor.availability.map((day) => (
              <span
                key={day}
                className={`text-sm
                ${lightMode ? "text-gray-500" : "text-white/60"}`}
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        {/* Przyciski akcji */}
        <div className="flex gap-3 mt-6">
          <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-medium transition-colors">
            Umów lekcję
          </button>
          <button
            className={`p-2 rounded-lg transition-colors
            ${
              lightMode
                ? "bg-gray-100 hover:bg-gray-200 text-gray-600"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <FaInstagram className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
