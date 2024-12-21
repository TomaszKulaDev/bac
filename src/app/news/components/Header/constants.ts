import { NavigationLink } from "./types";

export const NAVIGATION_LINKS: NavigationLink[] = [
  {
    href: "/wydarzenia",
    label: "Wydarzenia",
    submenu: {
      featured: {
        title: "Polecane wydarzenia",
        items: [
          {
            href: "/wydarzenia/world-bachata-masters",
            label: "World Bachata Masters 2024",
            image: "/images/events/wbm.jpg",
            description: "Największe wydarzenie bachatowe roku",
          },
        ],
      },
      categories: [
        {
          title: "Turnieje",
          items: [
            { href: "/wydarzenia/mistrzostwa", label: "Mistrzostwa" },
            { href: "/wydarzenia/konkursy", label: "Konkursy" },
          ],
        },
        {
          title: "Warsztaty",
          items: [
            { href: "/wydarzenia/warsztaty/weekendowe", label: "Weekendowe" },
            { href: "/wydarzenia/warsztaty/obozy", label: "Obozy taneczne" },
          ],
        },
      ],
    },
  },
  {
    href: "/styl",
    label: "Styl",
    submenu: {
      featured: {
        title: "Trendy",
        items: [
          {
            href: "/styl/trendy/sensual",
            label: "Sensual Bachata 2024",
            image: "/images/style/sensual.jpg",
          },
        ],
      },
      categories: [
        {
          title: "Dla niej",
          items: [
            { href: "/styl/sukienki", label: "Sukienki" },
            { href: "/styl/buty-damskie", label: "Buty" },
          ],
        },
        {
          title: "Dla niego",
          items: [
            { href: "/styl/koszule", label: "Koszule" },
            { href: "/styl/buty-meskie", label: "Buty" },
          ],
        },
      ],
    },
  },
  // ... pozostałe linki
];
