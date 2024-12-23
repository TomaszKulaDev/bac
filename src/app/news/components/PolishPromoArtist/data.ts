import { PolishArtist } from "./types";

export const polishArtistsData: PolishArtist[] = [
  {
    // Unikalny identyfikator instruktora/pary
    id: "1",
    
    // Imiona instruktorów wyświetlane w interfejsie
    name: "Adrian & Sara",
    
    // Ścieżka do zdjęcia profilowego (względna do folderu public)
    image: "/images/default-avatar.png", 
    
    // Miasto w którym prowadzą zajęcia
    city: "Warszawa",
    
    // Nazwa szkoły/studia tańca
    school: "Salsa Sabrosa",
    
    // Flaga określająca czy instruktor jest aktywny (true) czy nie (false)
    // Aktywni instruktorzy mają specjalne podświetlenie w UI
    isActive: true,
    
    // Specjalizacja taneczna instruktora
    specialty: "Bachata Sensual",
    
    // Liczba lat doświadczenia w nauczaniu
    experience: 8,
    
    // Linki do mediów społecznościowych
    // Opcjonalne - mogą być puste lub pominięte
    socialLinks: {
      instagram: "@adrian.sara.dance", // Nazwa użytkownika na Instagramie
      facebook: "adriansaradance",     // Identyfikator strony na Facebooku
      youtube: "AdrianSaraDance",      // Nazwa kanału YouTube
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
    isActive: true,
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
  {
    id: "6",
    name: "Marek & Julia",
    image: "/images/default-avatar.png",
    city: "Łódź",
    school: "Dance Factory",
    isActive: true,
    specialty: "Bachata Dominicana",
    experience: 6,
    socialLinks: {
      instagram: "@marekjulia.dance",
    },
  },
  {
    id: "7",
    name: "Robert & Ewa",
    image: "/images/default-avatar.png",
    city: "Szczecin",
    school: "Ritmo Latino",
    isActive: true,
    specialty: "Bachata Moderna",
    experience: 5,
  },
  {
    id: "8",
    name: "Daniel & Magda",
    image: "/images/default-avatar.png",
    city: "Białystok",
    school: "Salsa Fuerte",
    isActive: true,
    specialty: "Bachata Traditional",
    experience: 4,
    socialLinks: {
      facebook: "danielmagda.dance",
    },
  },
  {
    id: "9",
    name: "Bartek & Natalia",
    image: "/images/default-avatar.png",
    city: "Katowice",
    school: "Sensual Dance Studio",
    isActive: true,
    specialty: "Bachata Sensual",
    experience: 7,
    socialLinks: {
      instagram: "@bartek.natalia.dance",
      youtube: "BartekNataliaDance"
    },
  },
  {
    id: "10",
    name: "Adam & Zosia",
    image: "/images/default-avatar.png",
    city: "Lublin",
    school: "Bachata Soul",
    isActive: true,
    specialty: "Bachata Moderna",
    experience: 5,
    socialLinks: {
      facebook: "adamzosia.bachata",
    },
  },
  {
    id: "11",
    name: "Piotr & Marta",
    image: "/images/default-avatar.png",
    city: "Bydgoszcz",
    school: "Latino Power",
    isActive: true,
    specialty: "Bachata Fusion",
    experience: 6,
    socialLinks: {
      instagram: "@piotr.marta.dance",
    },
  },
  {
    id: "12",
    name: "Jakub & Alicja",
    image: "/images/default-avatar.png",
    city: "Rzeszów",
    school: "Bachata Kings",
    isActive: true,
    specialty: "Bachata Traditional",
    experience: 4,
  },
  {
    id: "13",
    name: "Marcin & Weronika",
    image: "/images/default-avatar.png",
    city: "Toruń",
    school: "Dance Vida",
    isActive: true,
    specialty: "Bachata Sensual",
    experience: 5,
    socialLinks: {
      instagram: "@marcin.weronika.bachata",
    },
  },
  {
    id: "14",
    name: "Filip & Karolina",
    image: "/images/default-avatar.png",
    city: "Olsztyn",
    school: "Salsa Rica",
    isActive: true,
    specialty: "Bachata Dominicana",
    experience: 3,
    socialLinks: {
      facebook: "filipkarolina.dance",
    },
  },
  {
    id: "15",
    name: "Szymon & Klaudia",
    image: "/images/default-avatar.png",
    city: "Radom",
    school: "Bachata Flow",
    isActive: true,
    specialty: "Urban Bachata",
    experience: 4,
    socialLinks: {
      instagram: "@szymon.klaudia.dance",
    },
  }
];
