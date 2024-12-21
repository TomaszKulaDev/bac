import { Ad } from "./AdColumn/types";

export const ads = {
  schoolAd: {
    imageUrl: "/images/bachata-schools.jpg",
    title: "Szkoła Tańca Latino",
    description:
      "Profesjonalna szkoła tańca z wieloletnim doświadczeniem. Pierwsze zajęcia gratis!",
    link: "https://szkola-tanca.pl",
  },
  courseAd: {
    imageUrl: "/images/bachata-steps.jpg",
    title: "Kurs Online Bachaty",
    description: "Naucz się podstawowych kroków bachaty w domu. Start od 99zł!",
    link: "https://kurs-bachaty.pl",
  },
  outfitAd: {
    imageUrl: "/images/bachata-outfit.jpg",
    title: "Stroje do Tańca",
    description:
      "Profesjonalne stroje i buty do tańca. Rabat -20% na pierwsze zakupy!",
    link: "https://stroje-taneczne.pl",
  },
  festivalAd: {
    imageUrl: "/images/bachata-festival.jpg",
    title: "Latino Festival 2024",
    description: "Największy festiwal bachaty w Polsce. Zapisz się już dziś!",
    link: "https://festival-bachata.pl",
  },
  romanceAd: {
    imageUrl: "/images/bachata-romance.jpg",
    title: "Warsztaty Sensual Bachata",
    description:
      "Poznaj tajniki zmysłowej bachaty. Warsztaty dla par i singli.",
    link: "https://sensual-bachata.pl",
  },
} as const;
