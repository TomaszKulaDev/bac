import { PolishArtist } from "./types";

export const polishArtistsData: PolishArtist[] = [
  {
    id: "1",
    name: "Adrian & Sara",
    image: "/images/default-avatar.png",
    city: "Warszawa",
    school: "Salsa Sabrosa",
    isActive: true,
    socialLinks: {
      instagram: "@adrian.sara.dance",
      facebook: "adriansaradance",
    },
  },
  {
    id: "2",
    name: "Kamil & Monika",
    image: "/images/default-avatar.png",
    city: "Kraków",
    school: "Bachata Fever",
    isActive: true,
    socialLinks: {
      instagram: "@kamil.monika.dance",
    },
  },
  {
    id: "3",
    name: "Michał & Ania",
    image: "/images/default-avatar.png",
    city: "Poznań",
    school: "Latino Flow",
    isActive: false,
    socialLinks: {
      facebook: "michalania.dance",
    },
  },
  {
    id: "4",
    name: "Tomek & Kasia",
    image: "/images/default-avatar.png",
    city: "Wrocław",
    school: "Bachata Masters",
    isActive: true,
  },
  {
    id: "5",
    name: "Paweł & Ola",
    image: "/images/default-avatar.png",
    city: "Gdańsk",
    school: "Dance Zone",
    isActive: true,
    socialLinks: {
      instagram: "@pawelola.bachata",
    },
  },
];
