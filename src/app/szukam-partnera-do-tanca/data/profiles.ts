export interface DancerInfo {
  id: string;
  name: string;
  age: number;
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
  };
  avatar: string;
}

export const profiles: DancerInfo[] = [
  {
    id: "1",
    name: "Natka",
    age: 35,
    info: {
      stylTanca: "Bachata",
      dostepnosc: "W przyszłości",
      preferowanyStyl: "Towarzysko",
      jezyk: "Polski",
      wzrost: "169 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "2 lata",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często na imprezach",
    },
    avatar: "/images/profiles/bachata-1.jpg",
  },
  {
    id: "2",
    name: "Marek",
    age: 28,
    info: {
      stylTanca: "Salsa",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski, Angielski",
      wzrost: "182 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "4 lata",
      palenie: "Nie palę",
      praktyki: "3x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często na imprezach",
    },
    avatar: "/images/profiles/salsa-1.jpg",
  },
  {
    id: "3",
    name: "Ania",
    age: 24,
    info: {
      stylTanca: "Bachata",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Towarzysko",
      jezyk: "Polski",
      wzrost: "165 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "6 miesięcy",
      palenie: "Nie palę",
      praktyki: "1x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami na imprezach",
    },
    avatar: "/images/profiles/bachata-2.jpg",
  },
  {
    id: "4",
    name: "Tomek",
    age: 31,
    info: {
      stylTanca: "Bachata, Salsa",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski, Hiszpański",
      wzrost: "178 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "5 lat",
      palenie: "Nie palę",
      praktyki: "4x w tygodniu",
      zajecia: "Instruktor",
      socjale: "Często na imprezach",
    },
    avatar: "/images/profiles/salsa-2.jpg",
  },
  {
    id: "5",
    name: "Kasia",
    age: 27,
    info: {
      stylTanca: "Bachata Sensual",
      dostepnosc: "W weekendy",
      preferowanyStyl: "Towarzysko",
      jezyk: "Polski",
      wzrost: "171 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "2 lata",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często na imprezach",
    },
    avatar: "/images/profiles/bachata-3.jpg",
  },
  {
    id: "6",
    name: "Piotr",
    age: 33,
    info: {
      stylTanca: "Bachata, Kizomba",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski, Angielski",
      wzrost: "180 cm",
      poziomZaawansowania: "Zaawansowany",
      doswiadczenie: "3 lata",
      palenie: "Nie palę",
      praktyki: "3x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często na imprezach",
    },
    avatar: "/images/profiles/kizomba-1.jpg",
  },
  {
    id: "7",
    name: "Magda",
    age: 29,
    info: {
      stylTanca: "Salsa",
      dostepnosc: "W weekendy",
      preferowanyStyl: "Towarzysko",
      jezyk: "Polski",
      wzrost: "168 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "1.5 roku",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami na imprezach",
    },
    avatar: "/images/profiles/salsa-3.jpg",
  },
  {
    id: "8",
    name: "Adam",
    age: 30,
    info: {
      stylTanca: "Bachata",
      dostepnosc: "Od zaraz",
      preferowanyStyl: "Sportowo",
      jezyk: "Polski",
      wzrost: "175 cm",
      poziomZaawansowania: "Średniozaawansowany",
      doswiadczenie: "2 lata",
      palenie: "Nie palę",
      praktyki: "2x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Często na imprezach",
    },
    avatar: "/images/profiles/bachata-4.jpg",
  },
  {
    id: "9",
    name: "Ola",
    age: 26,
    info: {
      stylTanca: "Bachata, Salsa",
      dostepnosc: "W przyszłości",
      preferowanyStyl: "Towarzysko",
      jezyk: "Polski, Angielski",
      wzrost: "170 cm",
      poziomZaawansowania: "Początkujący",
      doswiadczenie: "8 miesięcy",
      palenie: "Nie palę",
      praktyki: "1x w tygodniu",
      zajecia: "Regularne zajęcia",
      socjale: "Czasami na imprezach",
    },
    avatar: "/images/profiles/bachata-5.jpg",
  },
];
