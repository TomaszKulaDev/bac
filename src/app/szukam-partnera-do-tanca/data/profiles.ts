export interface DancerInfo {
  id: string;
  name: string;
  age: number;
  gender: "partner" | "partnerka";
  info: {
    stylTanca: string;
    dostepnosc: string;
    preferowanyStyl: string;
    jezyk: string;
    wzrost: string;
    poziomZaawansowania: string;
    doswiadczenie: string;
    palenie: string;
    praktyki: string;
    zajecia: string;
    socjale: string;
    lokalizacja: string;
  };
  avatar: string;
}

export const profiles: DancerInfo[] = [
  {
    id: "1",
    name: "Natalia",
    age: 28,
    gender: "partnerka",
    info: {
      stylTanca: "Bachata, Salsa",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski, Angielski",
      wzrost: "170 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "3 lata",
      palenie: "Nie palę",
      praktyki: "3x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Warszawa",
    },
    avatar: "/images/profiles/bachata-1.jpg",
  },
  {
    id: "2",
    name: "Karolina",
    age: 25,
    gender: "partnerka",
    info: {
      stylTanca: "Bachata",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski",
      wzrost: "165 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "1 rok",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami",
      lokalizacja: "Kraków",
    },
    avatar: "/images/profiles/bachata-2.jpg",
  },
  {
    id: "3",
    name: "Michał",
    age: 32,
    gender: "partner",
    info: {
      stylTanca: "Salsa, Bachata",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski, Hiszpański",
      wzrost: "182 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "5 lat",
      palenie: "Nie palę",
      praktyki: "4x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Wrocław",
    },
    avatar: "/images/profiles/bachata-3.jpg",
  },
  {
    id: "4",
    name: "Anna",
    age: 29,
    gender: "partnerka",
    info: {
      stylTanca: "Kizomba",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski, Angielski",
      wzrost: "168 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "2 lata",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami",
      lokalizacja: "Poznań",
    },
    avatar: "/images/profiles/bachata-4.jpg",
  },
  {
    id: "5",
    name: "Piotr",
    age: 35,
    gender: "partner",
    info: {
      stylTanca: "Zouk",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski",
      wzrost: "180 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "4 lata",
      palenie: "Nie palę",
      praktyki: "3x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Gdańsk",
    },
    avatar: "/images/profiles/bachata-5.jpg",
  },
  {
    id: "6",
    name: "Marta",
    age: 27,
    gender: "partnerka",
    info: {
      stylTanca: "Bachata, Kizomba",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski",
      wzrost: "172 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "6 miesięcy",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Rzadko",
      lokalizacja: "Szczecin",
    },
    avatar: "/images/profiles/bachata-6.jpg",
  },
  {
    id: "7",
    name: "Tomasz",
    age: 31,
    gender: "partner",
    info: {
      stylTanca: "Salsa",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski, Angielski",
      wzrost: "178 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "2 lata",
      palenie: "Nie palę",
      praktyki: "3x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Łódź",
    },
    avatar: "/images/profiles/bachata-7.jpg",
  },
  {
    id: "8",
    name: "Agnieszka",
    age: 26,
    gender: "partnerka",
    info: {
      stylTanca: "Bachata",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski",
      wzrost: "167 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "1 rok",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami",
      lokalizacja: "Lublin",
    },
    avatar: "/images/profiles/bachata-8.jpg",
  },
  {
    id: "9",
    name: "Marcin",
    age: 33,
    gender: "partner",
    info: {
      stylTanca: "Bachata, Salsa",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski",
      wzrost: "183 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "4 lata",
      palenie: "Nie palę",
      praktyki: "4x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Katowice",
    },
    avatar: "/images/profiles/bachata-9.jpg",
  },
  {
    id: "10",
    name: "Monika",
    age: 30,
    gender: "partnerka",
    info: {
      stylTanca: "Kizomba, Zouk",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski, Angielski",
      wzrost: "169 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "2 lata",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami",
      lokalizacja: "Białystok",
    },
    avatar: "/images/profiles/bachata-10.jpg",
  },
  {
    id: "11",
    name: "Kinga",
    age: 24,
    gender: "partnerka",
    info: {
      stylTanca: "Bachata",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski",
      wzrost: "165 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "6 miesięcy",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami",
      lokalizacja: "Bielsko-Biała",
    },
    avatar: "/images/profiles/bachata-1.jpg",
  },
  {
    id: "12",
    name: "Adam",
    age: 28,
    gender: "partner",
    info: {
      stylTanca: "Salsa",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski",
      wzrost: "180 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "2 lata",
      palenie: "Nie palę",
      praktyki: "3x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Bytom",
    },
    avatar: "/images/profiles/bachata-2.jpg",
  },
  {
    id: "13",
    name: "Julia",
    age: 27,
    gender: "partnerka",
    info: {
      stylTanca: "Kizomba",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski, Angielski",
      wzrost: "168 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "1 rok",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Rzadko",
      lokalizacja: "Bydgoszcz",
    },
    avatar: "/images/profiles/bachata-3.jpg",
  },
  {
    id: "14",
    name: "Paweł",
    age: 31,
    gender: "partner",
    info: {
      stylTanca: "Zouk",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski",
      wzrost: "175 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "3 lata",
      palenie: "Nie palę",
      praktyki: "4x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Częstochowa",
    },
    avatar: "/images/profiles/bachata-4.jpg",
  },
  {
    id: "15",
    name: "Magdalena",
    age: 29,
    gender: "partnerka",
    info: {
      stylTanca: "Bachata, Salsa",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski",
      wzrost: "170 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "2 lata",
      palenie: "Nie palę",
      praktyki: "3x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami",
      lokalizacja: "Dąbrowa Górnicza",
    },
    avatar: "/images/profiles/bachata-5.jpg",
  },
  {
    id: "16",
    name: "Krzysztof",
    age: 34,
    gender: "partner",
    info: {
      stylTanca: "Kizomba",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski, Angielski",
      wzrost: "182 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "4 lata",
      palenie: "Nie palę",
      praktyki: "4x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Elbląg",
    },
    avatar: "/images/profiles/bachata-6.jpg",
  },
  {
    id: "17",
    name: "Alicja",
    age: 26,
    gender: "partnerka",
    info: {
      stylTanca: "Bachata",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski",
      wzrost: "167 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "1 rok",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Rzadko",
      lokalizacja: "Gdynia",
    },
    avatar: "/images/profiles/bachata-7.jpg",
  },
  {
    id: "18",
    name: "Robert",
    age: 30,
    gender: "partner",
    info: {
      stylTanca: "Salsa",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski",
      wzrost: "178 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "2 lata",
      palenie: "Nie palę",
      praktyki: "3x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Gliwice",
    },
    avatar: "/images/profiles/bachata-8.jpg",
  },
  {
    id: "19",
    name: "Weronika",
    age: 25,
    gender: "partnerka",
    info: {
      stylTanca: "Zouk",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski, Angielski",
      wzrost: "166 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "8 miesięcy",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami",
      lokalizacja: "Gorzów Wielkopolski",
    },
    avatar: "/images/profiles/bachata-9.jpg",
  },
  {
    id: "20",
    name: "Kamil",
    age: 32,
    gender: "partner",
    info: {
      stylTanca: "Bachata, Kizomba",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski",
      wzrost: "181 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "3 lata",
      palenie: "Nie palę",
      praktyki: "4x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Kielce",
    },
    avatar: "/images/profiles/bachata-10.jpg",
  },
  {
    id: "21",
    name: "Sandra",
    age: 28,
    gender: "partnerka",
    info: {
      stylTanca: "Bachata, Salsa",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski",
      wzrost: "169 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "2 lata",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami",
      lokalizacja: "Koszalin",
    },
    avatar: "/images/profiles/bachata-1.jpg",
  },
  {
    id: "22",
    name: "Marek",
    age: 31,
    gender: "partner",
    info: {
      stylTanca: "Zouk",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski, Angielski",
      wzrost: "183 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "4 lata",
      palenie: "Nie palę",
      praktyki: "4x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Mielec",
    },
    avatar: "/images/profiles/bachata-2.jpg",
  },
  {
    id: "23",
    name: "Dominika",
    age: 26,
    gender: "partnerka",
    info: {
      stylTanca: "Kizomba",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski",
      wzrost: "165 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "1 rok",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Rzadko",
      lokalizacja: "Olsztyn",
    },
    avatar: "/images/profiles/bachata-3.jpg",
  },
  {
    id: "24",
    name: "Bartosz",
    age: 29,
    gender: "partner",
    info: {
      stylTanca: "Salsa",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski",
      wzrost: "180 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "2 lata",
      palenie: "Nie palę",
      praktyki: "3x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Opole",
    },
    avatar: "/images/profiles/bachata-4.jpg",
  },
  {
    id: "25",
    name: "Patrycja",
    age: 27,
    gender: "partnerka",
    info: {
      stylTanca: "Bachata",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski, Angielski",
      wzrost: "168 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "1 rok",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami",
      lokalizacja: "Płock",
    },
    avatar: "/images/profiles/bachata-5.jpg",
  },
  {
    id: "26",
    name: "Rafał",
    age: 33,
    gender: "partner",
    info: {
      stylTanca: "Zouk, Salsa",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski",
      wzrost: "182 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "5 lat",
      palenie: "Nie palę",
      praktyki: "4x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Radom",
    },
    avatar: "/images/profiles/bachata-6.jpg",
  },
  {
    id: "27",
    name: "Klaudia",
    age: 25,
    gender: "partnerka",
    info: {
      stylTanca: "Bachata",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski",
      wzrost: "166 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "6 miesięcy",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Rzadko",
      lokalizacja: "Ruda Śląska",
    },
    avatar: "/images/profiles/bachata-7.jpg",
  },
  {
    id: "28",
    name: "Daniel",
    age: 30,
    gender: "partner",
    info: {
      stylTanca: "Kizomba",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski, Angielski",
      wzrost: "179 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "2 lata",
      palenie: "Nie palę",
      praktyki: "3x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Rybnik",
    },
    avatar: "/images/profiles/bachata-8.jpg",
  },
  {
    id: "29",
    name: "Ewelina",
    age: 28,
    gender: "partnerka",
    info: {
      stylTanca: "Salsa",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski",
      wzrost: "170 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "1 rok",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami",
      lokalizacja: "Rzeszów",
    },
    avatar: "/images/profiles/bachata-9.jpg",
  },
  {
    id: "30",
    name: "Łukasz",
    age: 31,
    gender: "partner",
    info: {
      stylTanca: "Bachata, Kizomba",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski",
      wzrost: "181 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "4 lata",
      palenie: "Nie palę",
      praktyki: "4x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Sosnowiec",
    },
    avatar: "/images/profiles/bachata-10.jpg",
  },
  {
    id: "31",
    name: "Aleksandra",
    age: 27,
    gender: "partnerka",
    info: {
      stylTanca: "Zouk",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski, Angielski",
      wzrost: "167 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "2 lata",
      palenie: "Nie palę",
      praktyki: "3x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami",
      lokalizacja: "Tarnów",
    },
    avatar: "/images/profiles/bachata-1.jpg",
  },
  {
    id: "32",
    name: "Mateusz",
    age: 29,
    gender: "partner",
    info: {
      stylTanca: "Salsa",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski",
      wzrost: "180 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "3 lata",
      palenie: "Nie palę",
      praktyki: "4x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Toruń",
    },
    avatar: "/images/profiles/bachata-2.jpg",
  },
  {
    id: "33",
    name: "Karolina",
    age: 26,
    gender: "partnerka",
    info: {
      stylTanca: "Bachata",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski",
      wzrost: "165 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "1 rok",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Rzadko",
      lokalizacja: "Tychy",
    },
    avatar: "/images/profiles/bachata-3.jpg",
  },
  {
    id: "34",
    name: "Wojciech",
    age: 32,
    gender: "partner",
    info: {
      stylTanca: "Kizomba",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski, Angielski",
      wzrost: "183 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "4 lata",
      palenie: "Nie palę",
      praktyki: "4x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Wałbrzych",
    },
    avatar: "/images/profiles/bachata-4.jpg",
  },
  {
    id: "35",
    name: "Natalia",
    age: 28,
    gender: "partnerka",
    info: {
      stylTanca: "Bachata, Salsa",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski",
      wzrost: "169 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "2 lata",
      palenie: "Nie palę",
      praktyki: "3x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami",
      lokalizacja: "Włocławek",
    },
    avatar: "/images/profiles/bachata-5.jpg",
  },
  {
    id: "36",
    name: "Damian",
    age: 30,
    gender: "partner",
    info: {
      stylTanca: "Zouk",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski",
      wzrost: "178 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "3 lata",
      palenie: "Nie palę",
      praktyki: "4x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często",
      lokalizacja: "Zabrze",
    },
    avatar: "/images/profiles/bachata-6.jpg",
  },
  {
    id: "37",
    name: "Paulina",
    age: 27,
    gender: "partnerka",
    info: {
      stylTanca: "Salsa, Bachata",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Rekreacyjnie",
      jezyk: "Polski, Angielski",
      wzrost: "166 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "1 rok",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami",
      lokalizacja: "Zielona Góra",
    },
    avatar: "/images/profiles/bachata-7.jpg",
  },
];