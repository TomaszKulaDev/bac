import { motion } from "framer-motion";

const categories = [
  { id: "all", label: "Wszystkie style" },
  { id: "Bachata Sensual", label: "Bachata Sensual" },
  { id: "Bachata Dominicana", label: "Bachata Dominicana" },
  { id: "Ladies Styling", label: "Ladies Styling" },
  { id: "Partnerowanie", label: "Partnerowanie" },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="flex items-center justify-start overflow-x-auto pb-4 gap-4">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap
            ${
              activeCategory === category.id
                ? "bg-amber-500 text-white"
                : "bg-white/5 text-white/80 hover:bg-white/10"
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  );
}
