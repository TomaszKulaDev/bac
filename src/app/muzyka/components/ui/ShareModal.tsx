import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaLink,
  FaEnvelope,
} from "react-icons/fa";
import { toast } from "react-toastify";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
  url?: string;
}

export const ShareModal = ({
  isOpen,
  onClose,
  title = "Bachata Top lista 2025",
  text = "Sprawdź najlepsze utwory Bachaty!",
  url = typeof window !== "undefined" ? window.location.href : "",
}: ShareModalProps) => {
  const shareOptions = [
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      color: "#25D366",
      onClick: () =>
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`
        ),
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "#1877F2",
      onClick: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`
        ),
    },
    // {
    //   name: "Twitter",
    //   icon: FaTwitter,
    //   color: "#1DA1F2",
    //   onClick: () =>
    //     window.open(
    //       `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    //         text
    //       )}&url=${encodeURIComponent(url)}`
    //     ),
    // },
    // {
    //   name: "LinkedIn",
    //   icon: FaLinkedin,
    //   color: "#0A66C2",
    //   onClick: () =>
    //     window.open(
    //       `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    //         url
    //       )}`
    //     ),
    // },
    {
      name: "Email",
      icon: FaEnvelope,
      color: "#EA4335",
      onClick: () =>
        window.open(
          `mailto:?subject=${encodeURIComponent(
            title
          )}&body=${encodeURIComponent(text + "\n\n" + url)}`
        ),
    },
    {
      name: "Kopiuj link",
      icon: FaLink,
      color: "#6B7280",
      onClick: async () => {
        await navigator.clipboard.writeText(url);
        toast.success("Link skopiowany do schowka!");
        onClose();
      },
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="relative z-[9999999]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 
              bg-white rounded-2xl p-6 shadow-xl w-[90%] max-w-md"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Udostępnij</h3>
            <div className="grid grid-cols-3 gap-4">
              {shareOptions.map((option) => (
                <motion.button
                  key={option.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={option.onClick}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl 
                    hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${option.color}20` }}
                  >
                    <option.icon
                      className="text-2xl"
                      style={{ color: option.color }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{option.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
