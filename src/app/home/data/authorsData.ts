import { Author } from "../types/article";

export interface SectionAuthors {
  mainAuthors: Author[];
  educationAuthors: Author[];
  videoAuthors: Author[];
}

export const AUTHORS: SectionAuthors = {
  // Autorzy dla głównej sekcji newsów
  mainAuthors: [
    {
      name: "Sebastian Kościółek",
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop&q=60",
      role: "Redaktor Naczelny",
    },
    {
      name: "Adam Majcherek",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
      role: "Instruktor Bachaty",
    },
    {
      name: "Michał Domański",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
      role: "Tancerz",
    },
  ],

  // Autorzy dla sekcji edukacyjnej
  educationAuthors: [
    {
      name: "Anna Kowalska",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60",
      role: "Instruktorka",
    },
    {
      name: "Maria Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
      role: "Choreografka",
    },
    {
      name: "Jan Nowak",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=60",
      role: "Pedagog Tańca",
    },
  ],

  // Autorzy dla sekcji wideo
  videoAuthors: [
    {
      name: "Karolina Wiśniewska",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60",
      role: "Reżyserka",
    },
    {
      name: "Piotr Zieliński",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60",
      role: "Operator Kamery",
    },
    {
      name: "Marta Król",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=60",
      role: "Montażystka",
    },
  ],
};
