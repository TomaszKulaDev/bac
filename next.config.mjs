import { config } from "dotenv";
config();

/** @type {import('next').NextConfig} */
// Konfiguracja Next.js
const nextConfig = {
  // Włączenie trybu ścisłego Reacta, który pomaga w wykrywaniu potencjalnych problemów w aplikacji
  reactStrictMode: true,
  // Opcje eksperymentalne Next.js (obecnie puste)
  experimental: {
    serverActions: true,
  },
  // Konfiguracja obsługi zdalnych obrazów
  images: {
    remotePatterns: [
      {
        // Wzorzec dla obrazów z via.placeholder.com
        protocol: "https",
        hostname: "**",
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
  // Dodajemy konfigurację source maps
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.devtool = false;
    }
    return config;
  },
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
  poweredByHeader: false,
  compress: true,
};

// Eksportowanie konfiguracji Next.js
export default nextConfig;
