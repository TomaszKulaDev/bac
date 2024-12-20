import { PollData } from "./types";

export const pollsData: PollData[] = [
  {
    id: "style",
    title: "ANKIETA", 
    question: "Co najbardziej pociąga Cię w partnerze podczas tańca?",
    totalVotes: 145,
    options: [
      { id: "dominicana", text: "Pewność siebie i prowadzenie", votes: 45 },
      { id: "sensual", text: "Zmysłowe ruchy i bliskość", votes: 52 },
      { id: "moderna", text: "Technika i precyzja ruchów", votes: 28 },
      { id: "fusion", text: "Kreatywność i spontaniczność", votes: 20 },
    ],
  },
  {
    id: "frequency",
    title: "ANKIETA",
    question: "Ile razy w tygodniu tańczysz bachatę?",
    totalVotes: 98,
    options: [
      { id: "1-2", text: "1-2 razy", votes: 35 },
      { id: "3-4", text: "3-4 razy", votes: 42 },
      { id: "5-6", text: "5-6 razy", votes: 15 },
      { id: "daily", text: "Codziennie", votes: 6 },
    ],
  },
  {
    id: "outfit",
    title: "ANKIETA",
    question: "Co najbardziej przyciąga uwagę w stroju tancerki bachaty?",
    totalVotes: 167,
    options: [
      { id: "dress", text: "Zwiewna sukienka", votes: 48 },
      { id: "heels", text: "Wysokie obcasy", votes: 62 },
      { id: "makeup", text: "Makijaż i biżuteria", votes: 34 },
      { id: "fit", text: "Dopasowany strój", votes: 23 },
    ],
  },
  {
    id: "news-poll",
    title: "ANKIETA TYGODNIA",
    question: "Który temat z Bachata News najbardziej Cię zainteresował?",
    totalVotes: 234,
    options: [
      { 
        id: "festival-2024", 
        text: "Światowy Festiwal Bachaty 2024 w Warszawie", 
        votes: 89 
      },
      { 
        id: "championship", 
        text: "Daniel i Maya - Mistrzostwo Świata", 
        votes: 67 
      },
      { 
        id: "romance", 
        text: "Nowy kierunek: Bachata Romance", 
        votes: 45 
      },
      { 
        id: "schools", 
        text: "Top 10 szkół bachaty w Polsce", 
        votes: 33 
      },
    ],
  },
];
