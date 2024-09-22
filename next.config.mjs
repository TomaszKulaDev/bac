/** @type {import('next').NextConfig} */
// Konfiguracja Next.js
const nextConfig = {
  // Włączenie trybu ścisłego Reacta, który pomaga w wykrywaniu potencjalnych problemów w aplikacji
  reactStrictMode: true,
  // Opcje eksperymentalne Next.js (obecnie puste)
  experimental: {},
  // Konfiguracja obsługi zdalnych obrazów
  images: {
    remotePatterns: [
      {
        // Wzorzec dla obrazów z via.placeholder.com
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        // Wzorzec dla obrazów z img.youtube.com
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

// Eksportowanie konfiguracji Next.js
export default nextConfig;
