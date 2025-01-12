import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar, FaMapMarkerAlt, FaInstagram, FaCrown } from "react-icons/fa";
import { Instructor, InstructorLevel } from "@/types/instructor";

interface InstructorCardProps {
  instructor: Instructor;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const getGradientClass = (level: InstructorLevel): string => {
  const gradients = {
    master: "bg-gradient-to-br from-amber-500/10 to-red-500/10",
    expert: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    advanced: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
  };
  return gradients[level] || gradients.advanced;
};

export function InstructorCard({
  instructor,
  isHovered,
  onHover,
}: InstructorCardProps) {
  const gradientClass = getGradientClass(instructor.level);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => onHover(instructor.id)}
      onHoverEnd={() => onHover(null)}
      className="bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden 
                shadow-lg shadow-amber-500/10 border border-amber-500/10 
                hover:shadow-xl transition-all duration-300"
    >
      {/* Zdjęcie instruktora */}
      <div className="relative aspect-[3/4]">
        <Image
          src={instructor.image}
          alt={instructor.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Informacje o instruktorze */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{instructor.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <FaMapMarkerAlt className="text-amber-400" />
          <span className="text-sm">{instructor.location}</span>
        </div>

        {/* Specjalizacje */}
        <div className="flex flex-wrap gap-2 mb-4">
          {instructor.specialization.map((spec, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-red-500/20 
                       rounded-full text-xs backdrop-blur-sm"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Social media & achievements */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {instructor.instagram && (
          <motion.a
            href={`https://instagram.com/${instructor.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="bg-gradient-to-r from-amber-500 to-red-500 p-2 
                     rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FaInstagram className="text-white w-5 h-5" />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
