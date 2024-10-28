// src/app/login/page.tsx

"use client";
import React from "react";
// Importy z React i Next.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession, getSession } from "next-auth/react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { motion } from "framer-motion";
import {
  FaMusic,
  FaUsers,
  FaCrown,
  FaCalendar,
  FaHeart,
  FaGuitar,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaMapMarkerAlt,
  FaStar,
  FaBullhorn,
  FaDoorOpen,
} from "react-icons/fa";

// Importy z zewnętrznych bibliotek
import { z } from "zod";

// Importy lokalne
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import Input from "@/app/login/Input";

// Dodaj po importach
interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  bgColor: string;
}

// Dodaj po interfejsie StatItem
interface AdBanner {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  position: "left" | "right";
}

// Dodaj przed komponentem Login
const statsData: StatItem[] = [
  {
    icon: <FaUsers className="h-6 w-6 text-purple-400" />,
    value: "1000+",
    label: "Tancerzy",
    bgColor: "from-purple-400/20 to-purple-500/30",
  },
  {
    icon: <FaMusic className="h-6 w-6 text-yellow-400" />,
    value: "300+",
    label: "Utworów",
    bgColor: "from-yellow-400/20 to-yellow-500/30",
  },
  {
    icon: <FaCrown className="h-6 w-6 text-green-400" />,
    value: "10k+",
    label: "Filmów",
    bgColor: "from-green-400/20 to-green-500/30",
  },
  {
    icon: <FaCalendar className="h-6 w-6 text-pink-400" />,
    value: "700+",
    label: "Wydarzeń",
    bgColor: "from-pink-400/20 to-pink-500/30",
  },
];

const adBanners: AdBanner[] = [
  {
    title: "Szkoły Bachaty",
    description: "Rozpocznij swoją przygodę z bachatą już dziś!",
    icon: <FaGraduationCap className="h-6 w-6 text-yellow-400" />,
    image: "/images/school-banner.jpg",
    position: "left",
  },
  {
    title: "Warsztaty Taneczne",
    description: "Ucz się od najlepszych instruktorów z całego świata",
    icon: <FaChalkboardTeacher className="h-6 w-6 text-yellow-400" />,
    image: "/images/workshop-banner.jpg",
    position: "right",
  },
  {
    title: "Festiwale Bachaty",
    description: "Największe wydarzenie bachatowe w Polsce!",
    icon: <FaCrown className="h-6 w-6 text-yellow-400" />,
    image: "/images/festival-banner.jpg",
    position: "left",
  },
  {
    title: "Instruktorzy",
    description: "Znajdź najlepszych instruktorów w Polsce!",
    icon: <FaStar className="h-6 w-6 text-yellow-400" />,
    image: "/images/instructor-banner.jpg",
    position: "right",
  },
  {
    title: "Promuj siebie",
    description:
      "Pokaż swoje umiejętności taneczne i zbuduj swoją markę osobistą.",
    icon: <FaUsers className="h-6 w-6 text-yellow-400" />,
    image: "/images/promote-banner.jpg",
    position: "left",
  },
  {
    title: "Praktisy",
    description: "Znajdź miejsce do praktyki w swoim mieście",
    icon: <FaCalendar className="h-6 w-6 text-yellow-400" />,
    image: "/images/practice-banner.jpg",
    position: "right",
  },
];

// Schema walidacji formularza logowania
const loginSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

const BannerIcon = ({
  icon,
  color,
}: {
  icon: React.ReactNode;
  color: string;
}) => {
  return (
    <div
      className={`bg-${color}-400/20 p-2.5 rounded-full flex items-center justify-center backdrop-blur-sm
      border border-${color}-400/30 shadow-lg shadow-${color}-400/10 group-hover:scale-110 transition-transform duration-300`}
    >
      {icon}
    </div>
  );
};

const getBannerColor = (icon: React.ReactNode): string => {
  if (React.isValidElement(icon)) {
    const className = icon.props.className || "";
    const colorMatch = className.match(/text-(\w+)-400/);
    return colorMatch ? colorMatch[1] : "yellow";
  }
  return "yellow";
};

const BannerCard = ({
  banner,
  index,
  direction,
}: {
  banner: AdBanner;
  index: number;
  direction: "left" | "right";
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-[200px] w-full overflow-hidden rounded-2xl"
    >
      {/* Tło z obrazem */}
      <Image
        src={banner.image}
        alt={banner.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1e3b]/90 via-[#0a1e3b]/70 to-transparent" />

      {/* Animated pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/patterns/music-notes.svg')] bg-repeat animate-float" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        <div className="flex items-center space-x-3">
          <motion.div
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-[#0a1e3b] p-2 rounded-xl">{banner.icon}</div>
          </motion.div>
          <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
            {banner.title}
          </h3>
        </div>

        <div className="space-y-3">
          <p className="text-white/80 text-sm line-clamp-2">
            {banner.description}
          </p>
          <motion.button
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1e3b] py-2 px-4 rounded-lg 
              font-medium transition-all duration-300 hover:from-yellow-500 hover:to-yellow-700
              flex items-center space-x-2 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Dowiedz się więcej</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Login() {
  const leftBanners = adBanners.filter((banner) => banner.position === "left");
  const rightBanners = adBanners.filter(
    (banner) => banner.position === "right"
  );

  // Stan komponentu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Hooki
  const router = useRouter();
  const auth = useAuth();
  const dispatch = useDispatch();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(
        login({
          user: {
            id: session.user.id || "",
            email: session.user.email || "",
            name: session.user.name || "",
            role: session.user.role || "user",
          },
        })
      );

      if (session.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    }
  }, [status, session, router, dispatch]);

  const validateForm = () => {
    try {
      loginSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Login initiated");

    if (!validateForm()) {
      setIsLoading(false);
      console.log("Form validation failed");
      return;
    }

    try {
      console.log("Login attempt with email:", email);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log("SignIn result:", result);

      if (result?.error) {
        console.error("Login error:", result.error);
        setErrors({ form: result.error });
      } else {
        console.log("Login successful, redirecting to profile");
        router.push("/profile");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ form: "Wystąpił błąd podczas logowania. Spróbuj ponownie." });
    } finally {
      setIsLoading(false);
      console.log("Login process completed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputClasses = (value: string, errorKey: string) => {
    if (!value && !errors[errorKey]) {
      return "";
    }
    if (!errors[errorKey]) {
      return "focus:ring-green-500 border-green-500";
    } else {
      return "focus:ring-red-500 border-red-500";
    }
  };

  const handleResendVerification = async () => {
    try {
      const response = await fetch("/api/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 403) {
        setErrors({
          form: "Proszę zweryfikować swój adres e-mail przed zalogowaniem. Sprawdź swoją skrzynkę pocztową lub wyślij ponownie e-mail weryfikacyjny.",
        });
      } else if (response.status === 401 || response.status === 400) {
        setErrors({
          form: "Nieprawidłowe dane logowania. Spróbuj ponownie.",
        });
      } else if (!response.ok) {
        setErrors({
          form: `Wystąpił błąd podczas logowania: ${
            data.message || "Nieznany błąd"
          }`,
        });
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1e3b] to-[#2a4a7f] p-4">
      <div className="container mx-auto flex justify-between items-center max-w-screen-2xl">
        {/* Lewa kolumna banerów */}
        <div className="hidden xl:flex flex-col gap-8 w-[300px]">
          {leftBanners.map((banner, index) => (
            <BannerCard
              key={index}
              banner={banner}
              index={index}
              direction="left"
            />
          ))}
        </div>

        {/* Środkowa sekcja - bez zmian */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 max-w-6xl">
          {/* Lewa strona - Formularz */}
          <div className="w-full lg:w-1/2 max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-bold text-white mb-2">
                Witaj ponownie!
              </h1>
              <p className="text-white/80">Zaloguj się do swojego konta</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10"
            >
              <form onSubmit={handleLogin} className="space-y-6">
                {errors.form && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-200 text-sm">{errors.form}</p>
                  </div>
                )}

                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  placeholder="Twój adres email"
                  autoComplete="email"
                />

                <Input
                  label="Hasło"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  placeholder="Twoje hasło"
                  autoComplete="current-password"
                  showPasswordToggle
                  showPassword={showPassword}
                  onPasswordToggle={() => setShowPassword(!showPassword)}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1e3b] py-3 px-4 rounded-lg font-medium 
                    hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <LoadingSpinner /> : "Zaloguj się"}
                </button>

                {/* Link do resetowania hasła */}
                <div className="mt-4 text-center">
                  <Link
                    href="/forgot-password"
                    className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors duration-200"
                  >
                    Zapomniałeś hasła?
                  </Link>
                </div>

                {/* Separator */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 text-white/60 bg-[#0a1e3b]/50 backdrop-blur-lg">
                      lub kontynuuj przez
                    </span>
                  </div>
                </div>

                {/* Przycisk Google */}
                <motion.button
                  type="button"
                  onClick={() => signIn("google")}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-medium 
                    transition-all duration-200 flex items-center justify-center space-x-3 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src="/images/google-logo.svg"
                    alt="Google"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span>Zaloguj się przez Google</span>
                </motion.button>

                {/* Link do rejestracji */}
                <p className="text-center text-white/60 text-sm">
                  Nie masz jeszcze konta?{" "}
                  <Link
                    href="/register"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Zarejestruj się
                  </Link>
                </p>
              </form>
            </motion.div>
          </div>

          {/* Prawa strona - Banery */}
          <div className="w-full lg:w-1/2 space-y-6 hidden lg:block">
            {/* Baner główny */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-yellow-400/20 p-3 rounded-full">
                  <FaCalendar className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Bachata Festival 2025
                  </h2>
                  <p className="text-white/70">
                    Największe wydarzenie bachatowe tego lata!
                  </p>
                </div>
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                <Image
                  src="/images/bachata-event.jpg"
                  alt="Bachata Event"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-yellow-400 px-4 py-1 rounded-full">
                  <span className="text-sm font-bold text-[#0a1e3b]">
                    28-30 czerwca
                  </span>
                </div>
              </div>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200">
                Zarezerwuj bilet
              </button>
            </motion.div>

            {/* Premium Banner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-400/20 p-3 rounded-full">
                    <FaUsers className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Premium</h3>
                    <p className="text-white/70">Rozwiń swój biznes taneczny</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">49 zł</div>
                  <div className="text-white/60 text-sm">miesięcznie</div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-white/80">
                  <FaUsers className="h-4 w-4 mr-2 text-yellow-400" />
                  <span>Promuj swoją szkołę tańca</span>
                </div>
                <div className="flex items-center text-white/80">
                  <FaCalendar className="h-4 w-4 mr-2 text-yellow-400" />
                  <span>Dodawaj i promuj wydarzenia</span>
                </div>
                <div className="flex items-center text-white/80">
                  <FaUsers className="h-4 w-4 mr-2 text-yellow-400" />
                  <span>Buduj społeczność tancerzy</span>
                </div>
                <div className="flex items-center text-white/80">
                  <FaMusic className="h-4 w-4 mr-2 text-yellow-400" />
                  <span>Buduj swoją markę tancerza</span>
                </div>
              </div>
              <button
                className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1e3b] py-2 px-4 rounded-lg font-medium 
                hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
              >
                Wypróbuj Premium
              </button>
            </motion.div>

            {/* Statystyki */}
            <div className="grid grid-cols-2 gap-6">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/10
                    hover:shadow-2xl hover:border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`bg-gradient-to-br ${stat.bgColor} p-4 rounded-xl shadow-lg
                      backdrop-blur-xl border border-white/10 transform transition-transform duration-300
                      group-hover:scale-110`}
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <div
                        className="text-2xl font-bold text-white bg-clip-text text-transparent 
                        bg-gradient-to-r from-white to-white/80"
                      >
                        {stat.value}
                      </div>
                      <div className="text-white/70 text-sm font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Prawa kolumna banerów */}
        <div
          className="hidden xl:flex flex-col gap-6 w-[340px] p-6 bg-gradient-to-br from-white/5 to-white/10 
          backdrop-blur-lg rounded-2xl border border-white/10"
        >
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 rounded-full">
              <div className="bg-[#0a1e3b] px-4 py-1.5 rounded-full">
                <span className="text-white font-medium">Odkryj więcej</span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-5">
            {rightBanners.map((banner, index) => (
              <BannerCard
                key={index}
                banner={banner}
                index={index}
                direction="right"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
