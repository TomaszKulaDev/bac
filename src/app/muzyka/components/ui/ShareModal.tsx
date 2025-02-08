import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLink,
  FaEnvelope,
  FaFacebookMessenger,
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
  text = "🎵 Odkryj najlepsze utwory do tańca Bachaty! 💃🕺\n\nSprawdź playlistę, która pomaga tysiącom tancerzy w nauce. Znajdziesz tu:\n• Najnowsze hity\n• Utwory idealne do nauki\n• Ranking najpopularniejszych piosenek\n\nDołącz do społeczności Baciata.pl i rozwijaj swoją pasję! 🌟",
  url = typeof window !== "undefined" ? window.location.href : "",
}: ShareModalProps) => {
  const shareOptions = [
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "#1877F2",
      onClick: async () => {
        await navigator.clipboard.writeText(
          `${text}\n\nSprawdź tutaj ➡️ ${url}`
        );
        toast.success("Skopiowano! Teraz możesz wkleić tekst na Facebook 👍");
        onClose();
      },
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      color: "#E4405F",
      onClick: async () => {
        await navigator.clipboard.writeText(
          `🎵 Odkryj najlepsze utwory do Bachaty na Baciata.pl!\n\n` +
            `Playlista, która pomaga w nauce tańca 💃🕺\n\n` +
            `Link w bio ⬇️\n${url}\n\n` +
            `#bachata #muzyka #nauka #wydarzenia #informacje`
        );
        toast.success("Skopiowano! Teraz możesz wkleić tekst na Instagram 📸");
        onClose();
      },
    },
    {
      name: "Messenger",
      icon: FaFacebookMessenger,
      color: "#00B2FF",
      onClick: async () => {
        await navigator.clipboard.writeText(
          `${text}\n\nSprawdź tutaj ➡️ ${url}`
        );
        toast.success("Skopiowano! Teraz możesz wkleić tekst w Messenger 💬");
        onClose();
      },
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      color: "#25D366",
      onClick: async () => {
        await navigator.clipboard.writeText(
          `${text}\n\nSprawdź tutaj ➡️ ${url}`
        );
        toast.success("Skopiowano! Teraz możesz wkleić tekst w WhatsApp 📱");
        onClose();
      },
    },

    {
      name: "Email",
      icon: FaEnvelope,
      color: "#EA4335",
      onClick: async () => {
        const mailtoLink = `mailto:?subject=${encodeURIComponent(
          "Odkryj najlepsze utwory do Bachaty! 💃🕺"
        )}&body=${encodeURIComponent(
          `Cześć!\n\n${text}\n\nSprawdź tutaj: ${url}\n\nPozdrawiam!`
        )}`;
        window.open(mailtoLink);
        onClose();
      },
    },
    {
      name: "Kopiuj link",
      icon: FaLink,
      color: "#6B7280",
      onClick: async () => {
        await navigator.clipboard.writeText(`${text}\n\nSprawdź tutaj: ${url}`);
        toast.success("Link i opis skopiowane do schowka! 📋");
        onClose();
      },
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white rounded-2xl p-6 shadow-xl w-full max-w-md 
              mx-auto overflow-y-auto max-h-[90vh] sm:max-h-[600px]"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Super, że dzielisz się muzyką!
            </h3>

            <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-amber-800 text-sm leading-relaxed">
                
                Może to właśnie dzięki Tobie inni znajdą inspirację do
                treningów.
                <br /> Twoje udostępnienie to cenny wkład 🌟 💃🕺
              </p>
            </div>

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

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Muzyka łączy ludzi - dzięki Tobie ktoś może odkryć swoją nową
                ulubioną piosenkę! 🎶
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
