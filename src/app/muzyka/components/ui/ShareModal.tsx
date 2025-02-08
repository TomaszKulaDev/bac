import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaLink,
  FaEnvelope,
  FaFacebookMessenger,
  FaInstagram,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
  url?: string;
}

declare global {
  interface Window {
    FB: any;
  }
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
      name: "WhatsApp",
      icon: FaWhatsapp,
      color: "#25D366",
      onClick: () =>
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            `${text}\n\nSprawdź tutaj ➡️ ${url}`
          )}`
        ),
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "#1877F2",
      onClick: () => {
        if (window.FB) {
          window.FB.ui({
            method: "share",
            href: url,
            quote: text,
            hashtag: "#Bachata",
          });
        } else {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url
            )}&quote=${encodeURIComponent(text)}`
          );
        }
      },
    },
    {
      name: "Messenger",
      icon: FaFacebookMessenger,
      color: "#00B2FF",
      onClick: () =>
        window.open(
          `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
            url
          )}&app_id=1342323157222473&redirect_uri=${encodeURIComponent(
            url
          )}&quote=${encodeURIComponent(text)}`
        ),
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      color: "#E4405F",
      onClick: () => {
        navigator.clipboard.writeText(
          `🎵 Odkryj najlepsze utwory do Bachaty na Baciata.pl!\n\n` +
            `Playlista, która pomaga w nauce tańca 💃🕺\n\n` +
            `Link w bio ⬇️\n${url}\n\n` +
            `#bachata #taniec #muzyka #baciata #dance #learning`
        );
        toast.success(
          "Skopiowano tekst! Wklej go w Instagram Stories i dodaj link w bio! 📸"
        );
        onClose();
      },
    },
    {
      name: "Email",
      icon: FaEnvelope,
      color: "#EA4335",
      onClick: () =>
        window.open(
          `mailto:?subject=${encodeURIComponent(
            "Odkryj najlepsze utwory do Bachaty! 💃🕺"
          )}&body=${encodeURIComponent(
            `Cześć!\n\n${text}\n\nSprawdź tutaj: ${url}\n\nPozdrawiam!`
          )}`
        ),
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

  useEffect(() => {
    const loadFacebookSDK = () => {
      if (typeof window !== "undefined" && !window.FB) {
        const script = document.createElement("script");
        script.src = "https://connect.facebook.net/pl_PL/sdk.js";
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);

        window.fbAsyncInit = function () {
          window.FB.init({
            appId: "1342323157222473",
            autoLogAppEvents: true,
            xfbml: true,
            version: "v18.0",
          });
        };
      }
    };

    loadFacebookSDK();
  }, []);

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
                Dziękujemy, że pomagasz innym tancerzom w poszukiwaniu idealnej
                muzyki! 🎵
                <br />
                <br />
                Dzięki Tobie inni tancerze znajdą inspirację do treningów.
                Jesteś częścią tanecznej społeczności!
                <br /> Twoje udostępnienie to cenny wkład. <br />
                Wzajemnie się inspirujemy 🌟 💃🕺
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
