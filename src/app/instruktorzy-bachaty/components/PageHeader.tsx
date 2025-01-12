import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  gradient?: string;
}

export function PageHeader({
  title,
  subtitle,
  gradient = "from-amber-300 to-amber-600",
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1
        className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${gradient} 
                   bg-clip-text text-transparent mb-4`}
      >
        {title}
      </h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-300 max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Dekoracyjny element */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4 }}
        className={`h-1 w-24 mx-auto mt-6 bg-gradient-to-r ${gradient} 
                   rounded-full`}
      />
    </motion.div>
  );
}
