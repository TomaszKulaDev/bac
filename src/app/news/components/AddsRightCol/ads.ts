import { Ad } from "./AdColumn/types";

export const ads = {
  schoolAd: {
    imageUrl: "/ads/szkola-tanca.jpg",
    title: "Szkoła Tańca Latino",
    description: "Naucz się tańczyć bachatę w profesjonalnej szkole tańca",
    link: "https://szkola-tanca.pl",
  },
  courseAd: {
    imageUrl: "/ads/kurs-online.jpg",
    title: "Kurs Online Bachaty",
    description: "Ucz się w domu z najlepszymi instruktorami",
    link: "https://kurs-bachaty.pl",
  }
} as const;
